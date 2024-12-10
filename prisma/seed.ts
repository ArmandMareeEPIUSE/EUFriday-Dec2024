import { PrismaClient } from '@prisma/client';
import { createId as createCuid } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

const seed = async () => {
  const [theMatrix, momento, constantine, othello, johnWick] =
    await Promise.all([
      prisma.movie.create({
        data: {
          id: createCuid(),
          title: 'The Matrix',
          releaseDate: new Date('1999-03-31'),
        },
      }),
      prisma.movie.create({
        data: {
          id: createCuid(),
          title: 'Momento',
          releaseDate: new Date('2001-03-16'),
        },
      }),
      prisma.movie.create({
        data: {
          id: createCuid(),
          title: 'Constantine',
          releaseDate: new Date('2005-02-18'),
        },
      }),
      prisma.movie.create({
        data: {
          id: createCuid(),
          title: 'Othello',
          releaseDate: new Date('1995-12-15'),
        },
      }),
      prisma.movie.create({
        data: {
          id: createCuid(),
          title: 'John Wick',
          releaseDate: new Date('2014-10-24'),
        },
      }),
    ]);

  await Promise.all([
    prisma.actor.create({
      data: {
        name: 'Keanu Reeves',
        dateOfBirth: new Date('1964-09-02'),
        ActorMovies: {
          createMany: {
            data: [
              {
                movieId: theMatrix.id,
                characterName: 'Neo',
              },
              {
                movieId: johnWick.id,
                characterName: 'John Wick',
              },
              {
                movieId: constantine.id,
                characterName: 'John Constantine',
              },
            ],
          },
        },
      },
    }),
    prisma.actor.create({
      data: {
        name: 'Carrie-Anne Moss',
        dateOfBirth: new Date('1967-08-21'),
        ActorMovies: {
          createMany: {
            data: [
              {
                movieId: theMatrix.id,
                characterName: 'Trinity',
              },
              {
                movieId: momento.id,
                characterName: 'Natalie',
              },
            ],
          },
        },
      },
    }),
    prisma.actor.create({
      data: {
        name: 'Laurence Fishburne',
        dateOfBirth: new Date('1961-07-30'),
        ActorMovies: {
          createMany: {
            data: [
              {
                movieId: theMatrix.id,
                characterName: 'Morpheus',
              },
              {
                movieId: othello.id,
                characterName: 'Othello',
              },
            ],
          },
        },
      },
    }),
    prisma.actor.create({
      data: {
        name: 'Ian McShane',
        dateOfBirth: new Date('1942-09-29'),
        ActorMovies: {
          createMany: {
            data: {
              movieId: johnWick.id,
              characterName: 'Winston',
            },
          },
        },
      },
    }),
    prisma.actor.create({
      data: {
        name: 'Guy Pearce',
        dateOfBirth: new Date('1967-10-05'),
        ActorMovies: {
          createMany: {
            data: {
              movieId: momento.id,
              characterName: 'Leonard Shelby',
            },
          },
        },
      },
    }),
    prisma.actor.create({
      data: {
        name: 'Rachel Weisz',
        dateOfBirth: new Date('1970-03-07'),
        ActorMovies: {
          createMany: {
            data: {
              movieId: constantine.id,
              characterName: 'Isabel Dodson',
            },
          },
        },
      },
    }),
  ]);
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
