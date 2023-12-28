// NOTE: Enable this after creating the account/dashboard page
/*
import { StatusCodes } from 'http-status-codes';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }: { locals: App.Locals }) => {
  if (await locals.auth.validate()) throw redirect(StatusCodes.MOVED_TEMPORARILY, '/account');
};
*/
