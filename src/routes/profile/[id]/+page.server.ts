import { auth } from '$lib/server/lucia';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
  params,
}: {
  params: { id: string };
  locals: App.Locals;
}) => {
  const { id } = params;

  try {
    const user = await auth.getUser(id);

    /* TODO: Implementar visibilidade de perfil

  if (user.profileVisibility === 'private') {
    return fail(StatusCodes.FORBIDDEN, {
      error: 'Este perfil é privado',
    });
  }
  */

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
