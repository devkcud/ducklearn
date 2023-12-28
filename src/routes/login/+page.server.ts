import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import type { Actions } from './$types';
import { LuciaError } from 'lucia';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const registerForm = z.object({
      username: z
        .string({
          required_error: 'O nome de usuário é obrigatório.',
          invalid_type_error: 'O nome de usuário deve ser um texto.',
        })
        .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres.')
        .max(32, 'O nome de usuário deve ter no máximo 32 caracteres.'),
      password: z
        .string({
          required_error: 'A senha é obrigatória.',
          invalid_type_error: 'A senha deve ser um texto.',
        })
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .max(64, 'A senha deve ter no maximo 64 caracteres'),
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

      console.log(session);

      console.log(locals);
      console.log(locals.auth);

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

    throw redirect(StatusCodes.TEMPORARY_REDIRECT, '/');
  },
};
