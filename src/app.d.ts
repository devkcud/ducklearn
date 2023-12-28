import type { PrismaClient } from '@prisma/client';

declare global {
  namespace App {}

  var prisma: PrismaClient;
}

declare namespace Lucia {
  type Auth = import('$lib/server/lucia').Auth;
  type DatabaseUserAttributes = {
    username: string;
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
  };
  type DatabaseSessionAttributes = {};
}

export {};
