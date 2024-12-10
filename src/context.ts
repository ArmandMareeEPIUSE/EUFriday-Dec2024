/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type GraphQLContext = {
  prisma: PrismaClient;
  userClient: {
    userId: string;
    clientId: string;
  };
};

export const createContext = (initialContext: any): GraphQLContext => ({
  prisma,
  userClient: {
    userId: initialContext.req.auth.userId,
    clientId: initialContext.req.auth.clientId,
  },
});
