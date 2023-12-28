import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { StatusCodes } from 'http-status-codes';

export const GET: RequestHandler = async ({ locals }: { locals: App.Locals }) => {
  const session = await locals.auth.validate();
  if (!session) throw redirect(StatusCodes.MOVED_TEMPORARILY, '/');

  await auth.invalidateSession(session.sessionId);
  locals.auth.setSession(null);

  throw redirect(StatusCodes.MOVED_TEMPORARILY, '/');
};
