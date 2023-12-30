import prisma from '$lib/server/prisma';
import { StatusCodes } from 'http-status-codes';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

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
    const user = await prisma.user.findFirst({
      where: { username },
      include: { followers: true, following: true, badges: true },
    });

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

    const isFollowing = (await prisma.follows.findFirst({
      where: {
        followerId: self?.user.userId,
        followingId: user.id,
      },
    }))
      ? true
      : false;

    return {
      username: user.username,
      displayName: user.displayName,
      about: user.about,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      stars: user.stars,
      followers: user.followers,
      following: user.following,
      canFollow: self?.user.userId !== user.id,
      isFollowing,
      badges,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Erro ao buscar perfil',
    };
  }
};

export const actions: Actions = {
  follow: async ({ request, locals }) => {
    const self = await locals.auth.validate();

    const username = Object.fromEntries(await request.formData())['username'].toString();

    const userToFollow = await prisma.user.findFirst({
      where: { username },
    });

    try {
      await prisma.follows.create({
        data: {
          followerId: self!.user.userId!,
          followingId: userToFollow!.id,
        },
      });
    } catch (error) {
      console.error(error);
    }

    throw redirect(StatusCodes.MOVED_TEMPORARILY, `/perfil/${username}`);
  },
  unfollow: async ({ request, locals }) => {
    const self = await locals.auth.validate();

    const username = Object.fromEntries(await request.formData())['username'].toString();

    const userToFollow = await prisma.user.findFirst({
      where: { username },
    });

    try {
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: self!.user.userId!,
            followingId: userToFollow!.id,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }

    throw redirect(StatusCodes.MOVED_TEMPORARILY, `/perfil/${username}`);
  },
};
