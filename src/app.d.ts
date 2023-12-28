declare global {
  namespace App {
    interface Locals {
      auth: import('lucia').AuthRequest;
    }
  }

  namespace Lucia {
    type Auth = import('$lib/server/lucia').Auth;
    type DatabaseUserAttributes = {
      username: string;
      displayName: string;
      createdAt: Date;
      updatedAt: Date;
    };
    type DatabaseSessionAttributes = Record<string, never>;
  }

  var prisma: PrismaClient;
}

export {};
