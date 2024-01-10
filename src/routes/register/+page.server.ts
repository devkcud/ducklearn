import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import type { Actions } from './$types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const actions: Actions = {
  default: async ({ request }: { request: Request }) => {
    const registerForm = z
      .object({
        username: z.coerce
          .string({
            required_error: 'O nome de usuário é obrigatório.',
          })
          .regex(/^[a-z0-9]+$/, 'O nome de usuário deve conter apenas letras minúsculas e números')
          .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres.')
          .max(32, 'O nome de usuário deve ter no máximo 32 caracteres.'),
        password: z.coerce
          .string({
            required_error: 'A senha é obrigatória.',
          })
          .regex(/[^a-zA-Z0-9]/, 'A senha deve conter ao menos 1 caractere especial')
          .min(8, 'A senha deve ter pelo menos 8 caracteres')
          .max(64, 'A senha deve ter no maximo 64 caracteres'),
        passwordConfirm: z.coerce.string({
          required_error: 'A confirmação da senha é obrigatória.',
        }),
      })
      .refine((data) => data.password === data.passwordConfirm, {
        message: 'As senhas devem ser iguais',
        path: ['passwordConfirm'],
      });

    const parse = registerForm.safeParse(Object.fromEntries(await request.formData()));

    if (parse.success === false) {
      return fail(StatusCodes.BAD_REQUEST, { error: parse.error.issues[0].message });
    }

    const { username, password } = parse.data;

    try {
      await auth.createUser({
        key: {
          providerId: 'username',
          providerUserId: username.toLowerCase(),
          password,
        },
        attributes: {
          username,
          displayName: username,
          about: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          stars: 500,
          profileVisibility: 'public',
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        return fail(StatusCodes.CONFLICT, { error: 'Este nome de usuário já existe.' });
      }

      console.error(error);
      return fail(StatusCodes.INTERNAL_SERVER_ERROR, { error: 'Um erro inesperado aconteceu' });
    }

    throw redirect(StatusCodes.TEMPORARY_REDIRECT, '/login');
  },
};
