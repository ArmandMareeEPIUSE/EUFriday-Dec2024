import { GraphQLContext } from '../../context';

interface Movie {
  id: string;
  title: string;
  releaseDate: Date;
}

export const query = {
  movie: async (
    parent: unknown,
    args: { id: string },
    context: GraphQLContext,
  ) => {
    const movie = await context.prisma.movie.findUnique({
      where: {
        id: args.id,
      },
    });

    return movie;
  },
  movies: async (parent: unknown, args: unknown, context: GraphQLContext) => {
    const movies = await context.prisma.movie.findMany({});

    return movies;
  },
};

export const resolver = {
  id: (parent: Movie) => {
    return parent.id;
  },
  title: (parent: Movie) => {
    return parent.title;
  },
  releaseDate: (parent: Movie) => {
    return parent.releaseDate;
  },
  movieActors: async (
    parent: Movie,
    args: unknown,
    context: GraphQLContext,
  ) => {
    const movieActors = context.prisma.movieActor.findMany({
      where: {
        movieId: parent.id,
      },
    });

    return movieActors;
  },
  actors: async (parent: Movie, args: unknown, context: GraphQLContext) => {
    // You can also do this in multiple steps. First find all the MovieActors,
    // Then find all the movies that match those ids. The method below just combines
    // those steps into a JOIN.

    const actors = await context.prisma.actor.findMany({
      where: {
        ActorMovies: {
          some: {
            movieId: parent.id,
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
