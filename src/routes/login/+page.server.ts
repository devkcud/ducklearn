import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import type { Actions } from './$types';
import { LuciaError } from 'lucia';

export const actions: Actions = {
  default: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
    const registerForm = z.object({
      username: z.coerce.string({
        required_error: 'O nome de usuário é obrigatório.',
      }),
      password: z.coerce.string({
        required_error: 'A senha é obrigatória.',
      }),
    });

    const parse = registerForm.safeParse(Object.fromEntries(await request.formData()));

    if (parse.success === false) {
      return fail(StatusCodes.BAD_REQUEST, { error: parse.error.issues[0].message });
    }

    const { username, password } = parse.data;

    try {
      const key = await auth.useKey('username', username.toLowerCase(), password);

      const session = await auth.createSession({
        userId: key.userId,
        attributes: {},
      });

      locals.auth.setSession(session);
    } catch (error) {
      if (
        error instanceof LuciaError &&
        (error.message === 'AUTH_INVALID_KEY_ID' || error.message === 'AUTH_INVALID_PASSWORD')
      ) {
        return fail(StatusCodes.UNAUTHORIZED, { error: 'Usuário ou senha inválidos' });
      }

      console.error(error);
      return fail(StatusCodes.INTERNAL_SERVER_ERROR, { error: 'Um erro inesperado aconteceu' });
    }

    throw redirect(StatusCodes.TEMPORARY_REDIRECT, '/perfil');
  },
};
