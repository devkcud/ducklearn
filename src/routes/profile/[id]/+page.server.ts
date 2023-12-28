import { auth } from '$lib/server/lucia';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
  params,
  locals,
}: {
  params: { id: string };
  locals: App.Locals;
}) => {
  const self = await locals.auth.validate();
  const { id } = params;

  try {
    const user = await auth.getUser(id);

    if (
      self?.user.userId !== id &&
      (user.profileVisibility === 'private' || user.profileVisibility === 'protected')
    ) {
      return {
        error: 'Este perfil é privado',
      };
    }

    return {
      username: user.username,
      displayName: user.displayName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    return {
      error: `Usuário não encontrado com o ID: ${id}`,
    };
  }
};
