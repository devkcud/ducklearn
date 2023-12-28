import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
  params,
  locals,
}: {
  params: { username: string };
  locals: App.Locals;
}) => {
  const self = await locals.auth.validate();
  const { username } = params;

  try {
    const user = await prisma.user.findFirst({ where: { username } });

    if (!user) {
      // Empty because it will be caught in the catch block
      throw new Error();
    }

    if (self?.user.userId !== user.id && user.profileVisibility === 'private') {
      return {
        error: 'Este perfil é privado',
      };
    }

    return {
      username: user.username,
      displayName: user.displayName,
      about: user.about,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      stars: user.stars,
    };
  } catch (error) {
    return {
      error: `Usuário não encontrado com o nome: ${username}`,
    };
  }
};
