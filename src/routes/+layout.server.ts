import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }: { locals: App.Locals }) => {
  const user = await locals.auth.validate();

  if (!user) {
    return {
      logged: false,
    };
  }

  const { username } = user.user;

  return {
    logged: true,
    user: {
      // TODO: Add user profile pictures
      username,
    },
  };
};
