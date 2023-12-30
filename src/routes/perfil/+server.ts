import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { StatusCodes } from 'http-status-codes';

export const GET: RequestHandler = async ({ locals }: { locals: App.Locals }) => {
  const session = await locals.auth.validate();

  throw redirect(StatusCodes.MOVED_TEMPORARILY, `/perfil/${session!.user.username}`);
};
