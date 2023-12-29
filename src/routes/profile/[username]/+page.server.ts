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
    const user = await prisma.user.findFirst({ where: { username }, include: { badges: true } });

    if (!user) {
      return {
        error: `Usuário não encontrado com o nome: ${username}`,
      };
    }

    if (self?.user.userId !== user.id && user.profileVisibility === 'private') {
      return {
        error: 'Este perfil é privado',
      };
    }

    let badges: { id: string; name: string }[] = [];
    const badgesList = user.badges.map(async (badge) => {
      const badgeInfo = await prisma.badge.findFirst({
        where: { id: badge.badgeId },
      });

      if (badgeInfo) {
        badges = [...badges, badgeInfo];
      }
    });

    await Promise.all(badgesList);

    return {
      username: user.username,
      displayName: user.displayName,
      about: user.about,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      stars: user.stars,
      badges,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Erro ao buscar perfil',
    };
  }
};