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
      about: string;
      createdAt: Date;
      updatedAt: Date;
      stars: number;
      profileVisibility: 'public' | 'private' | 'protected';
    };
    type DatabaseSessionAttributes = Record<string, never>;
  }

  var prisma: PrismaClient;
}

export {};
