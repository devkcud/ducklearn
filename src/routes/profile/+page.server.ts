import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }: { locals: App.Locals }) => {
  const user = await locals.auth.validate();

  const { username, displayName, createdAt, updatedAt } = user!.user;

  return {
    username,
    displayName,
    createdAt,
    updatedAt,
  };
};
