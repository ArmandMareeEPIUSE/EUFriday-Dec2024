import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type GraphQLContext = {
  prisma: PrismaClient;
  prismaClientIsAvailableInTheContext: string;
};

export const createContext = (): GraphQLContext => ({
  prisma,
  prismaClientIsAvailableInTheContext:
    'The Prisma Client (used for reading the database) is available in the context.',
});
