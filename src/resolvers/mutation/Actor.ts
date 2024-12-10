/**************************************************************
 *                        EXAMPLE FILE                        *
 **************************************************************
 * Use this file as an example of how to build GraphQL        *
 * query resolvers.                                           *
 *                                                            *
 * NOTE: Since we are building a resolvers over multiple files*
 * we have to export the functions in a specific format and   *
 * then import them again in the index.ts file                *
 **************************************************************/

import { GraphQLContext } from '../../context';
type ActorCreateInput = {
  name: string;
  dateOfBirth: Date;
};
type ActorUpdateInput = {
  id: string;
} & ActorCreateInput;
type ActorDeleteInput = {
  id: string;
};

export const mutation = {
  createActor: async (
    parent: unknown,
    args: ActorCreateInput,
    context: GraphQLContext,
  ) => {
    const actor = await context.prisma.actor.create({
      data: {
        name: args.name,
        dateOfBirth: args.dateOfBirth,
      },
    });

    return actor;
  },
  updateActor: async (
    parent: unknown,
    args: ActorUpdateInput,
    context: GraphQLContext,
  ) => {
    const actor = await context.prisma.actor.update({
      data: {
        name: args.name,
        dateOfBirth: args.dateOfBirth,
      },
      where: {
        id: args.id,
      },
    });

    return actor;
  },
  deleteActor: async (
    parent: unknown,
    args: ActorDeleteInput,
    context: GraphQLContext,
  ) => {
    const actor = await context.prisma.actor.delete({
      where: {
        id: args.id,
      },
    });

    return actor;
  },
};

export default {
  mutation,
};
