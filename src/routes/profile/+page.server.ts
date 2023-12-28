import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { StatusCodes } from 'http-status-codes';

export const load: PageServerLoad = async ({ locals }: { locals: App.Locals }) => {
  const user = await locals.auth.validate();

  return redirect(StatusCodes.MOVED_TEMPORARILY, `/profile/${user!.user.username}`);
};
