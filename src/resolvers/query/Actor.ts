import { GraphQLContext } from '../../context';

interface Actor {
  id: string;
  name: string;
  dateOfBirth: Date;
}

export const query = {
  actor: async (
    parent: unknown,
    args: { id: string },
    context: GraphQLContext,
  ) => {
    const actor = context.prisma.actor.findUnique({
      where: {
        id: args.id,
      },
    });

    return actor;
  },
  actors: async (parent: unknown, args: unknown, context: GraphQLContext) => {
    const actors = context.prisma.actor.findMany({});

    return actors;
  },
};

export const resolver = {
  id: (parent: Actor) => {
    return parent.id;
  },
  name: (parent: Actor) => {
    return parent.name;
  },
  dateOfBirth: (parent: Actor) => {
    return parent.dateOfBirth;
  },
  actorMovies: async (
    parent: Actor,
    args: unknown,
    context: GraphQLContext,
  ) => {
    const actorMovies = context.prisma.movieActor.findMany({
      where: {
        actorId: parent.id,
      },
    });

    return actorMovies;
  },
  movies: async (parent: Actor, args: unknown, context: GraphQLContext) => {
    // You can also do this in multiple steps. First find all the MovieActors,
    // Then find all the movies that match those ids. The method below just combines
    // those steps into a JOIN.

    const actors = await context.prisma.movie.findMany({
      where: {
        MovieActors: {
          some: {
            actorId: parent.id,
          },
        },
      },
    });

    return actors;
  },
};

export default {
  query,
  resolver,
};
