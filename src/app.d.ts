import type { PrismaClient } from '@prisma/client';

declare global {
  namespace App {}

  var prisma: PrismaClient;
}

export {};
