import { auth } from '$lib/server/lucia';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
  params,
  locals,
}: {
  params: { id: string };
  locals: App.Locals;
}) => {
  const self = await locals.auth.validate();
  const { id } = params;

  try {
    const userPrisma = await prisma.user.findFirst({
      where: {
        username: id,
      },
    });

    const user = await auth.getUser(userPrisma!.id!);

    if (
      self?.user.userId !== id &&
      (user.profileVisibility === 'private' || user.profileVisibility === 'protected')
    ) {
      return {
        error: 'Este perfil é privado',
      };
    }

    return {
      username: user.username,
      displayName: user.displayName,
      about: '',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      badges: [],
      awards: [],
      stars: 0,
      followers: 0,
      following: 0,
    };
  } catch (error) {
    return {
      error: `Usuário não encontrado com o ID: ${id}`,
    };
  }
};
