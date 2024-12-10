import { GraphQLContext } from '../../context';

interface MovieActor {
  id: string;
  movieId: string;
  actorId: string;
  characterName: string;
}

export const query = {};

export const resolver = {
  id: (parent: MovieActor) => {
    return parent.id;
  },
  movieId: (parent: MovieActor) => {
    return parent.movieId;
  },
  actorId: (parent: MovieActor) => {
    return parent.actorId;
  },
  characterName: (parent: MovieActor) => {
    return parent.characterName;
  },
  movie: (parent: MovieActor, args: unknown, context: GraphQLContext) =>
    context.prisma.movie.findUnique({
      where: {
        id: parent.movieId,
      },
    }),
  actor: (parent: MovieActor, args: unknown, context: GraphQLContext) =>
    context.prisma.actor.findUnique({
      where: {
        id: parent.actorId,
      },
    }),
};

export default {
  query,
  resolver,
};
