import { lucia } from 'lucia';
import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import prisma from '$lib/server/prisma';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
  env: dev ? 'DEV' : 'PROD',
  adapter: prismaAdapter(prisma),
  middleware: sveltekit(),
  getUserAttributes: (user) => {
    return {
      username: user.username,
      displayName: user.displayName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      stars: user.stars,
      profileVisibility: user.profileVisibility,
    };
  },
  getSessionAttributes: () => {
    return {};
  },
});

export type Auth = typeof auth;
