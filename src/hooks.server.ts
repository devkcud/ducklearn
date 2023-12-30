import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);
  const session = await event.locals.auth.validate();

  if (event.url.pathname.startsWith('/profile') || event.url.pathname.startsWith('/logout')) {
    if (!session) {
      throw redirect(StatusCodes.MOVED_TEMPORARILY, '/login');
    }
  }

  if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) {
    if (session) {
      throw redirect(StatusCodes.MOVED_TEMPORARILY, '/profile');
    }
  }

  if (event.url.pathname.startsWith('/profile') && event.params.username) {
    const self = await event.locals.auth.validate();
    const { username } = event.params;

    const user = await prisma.user.findFirst({
      where: { username },
      include: { followers: true, following: true, badges: true },
    });

    if (!event.url.pathname.endsWith(username)) {
      if (!user) {
        throw redirect(StatusCodes.MOVED_TEMPORARILY, '/profile/' + username);
      }

      if (self?.user.userId !== user.id && user.profileVisibility === 'private') {
        throw redirect(StatusCodes.MOVED_TEMPORARILY, '/profile/' + username);
      }
    }
  }

  return await resolve(event);
};
