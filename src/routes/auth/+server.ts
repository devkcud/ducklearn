import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { StatusCodes } from 'http-status-codes';

export const GET: RequestHandler = async () => {
  throw redirect(StatusCodes.MOVED_TEMPORARILY, '/');
};
