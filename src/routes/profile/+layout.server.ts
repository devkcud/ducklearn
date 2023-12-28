import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { StatusCodes } from 'http-status-codes';

export const load: LayoutServerLoad = async ({ locals }: { locals: App.Locals }) => {
  const user = await locals.auth.validate();

  if (!user) {
    throw redirect(StatusCodes.MOVED_TEMPORARILY, '/login');
  }
};
