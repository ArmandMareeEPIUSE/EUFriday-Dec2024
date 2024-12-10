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
type MovieCreateInput = {
  title: string;
  releaseDate: Date;
};
type MovieUpdateInput = {
  id: string;
} & MovieCreateInput;
type MovieDeleteInput = {
  id: string;
};

export const mutation = {
  createMovie: async (
    parent: unknown,
    args: MovieCreateInput,
    context: GraphQLContext,
  ) => {
    const movie = await context.prisma.movie.create({
      data: {
        title: args.title,
        releaseDate: args.releaseDate,
      },
    });

    return movie;
  },
  updateMovie: async (
    parent: unknown,
    args: MovieUpdateInput,
    context: GraphQLContext,
  ) => {
    const movie = await context.prisma.movie.update({
      data: {
        title: args.title,
        releaseDate: args.releaseDate,
      },
      where: {
        id: args.id,
      },
    });

    return movie;
  },
  deleteMovie: async (
    parent: unknown,
    args: MovieDeleteInput,
    context: GraphQLContext,
  ) => {
    const movie = await context.prisma.movie.delete({
      where: {
        id: args.id,
      },
    });

    return movie;
  },
};

export default {
  mutation,
};
