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
type MovieActorCreateInput = {
  movieId: string;
  actorId: string;
  characterName: string;
};
type MovieActorUpdateInput = {
  id: string;
} & MovieActorCreateInput;
type MovieActorDeleteInput = {
  id: string;
};

export const mutation = {
  createMovieActor: async (
    parent: unknown,
    args: MovieActorCreateInput,
    context: GraphQLContext,
  ) => {
    const Movieactor = await context.prisma.movieActor.create({
      data: {
        movieId: args.movieId,
        actorId: args.actorId,
        characterName: args.characterName,
      },
    });

    return Movieactor;
  },
  updateMovieActor: async (
    parent: unknown,
    args: MovieActorUpdateInput,
    context: GraphQLContext,
  ) => {
    const Movieactor = await context.prisma.movieActor.update({
      data: {
        movieId: args.movieId,
        actorId: args.actorId,
        characterName: args.characterName,
      },
      where: {
        id: args.id,
      },
    });

    return Movieactor;
  },
  deleteMovieActor: async (
    parent: unknown,
    args: MovieActorDeleteInput,
    context: GraphQLContext,
  ) => {
    const Movieactor = await context.prisma.movieActor.delete({
      where: {
        id: args.id,
      },
    });

    return Movieactor;
  },
};

export default {
  mutation,
};
