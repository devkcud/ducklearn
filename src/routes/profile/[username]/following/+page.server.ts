import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const user = await prisma.user.findFirst({
    where: { username },
    include: {
      following: {
        select: {
          following: true,
        },
      },
    },
  });

  return {
    username: user!.username,
    displayName: user!.displayName,
    following: user!.following.map((following) => following.following),
  };
};
