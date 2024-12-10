/* eslint-disable @typescript-eslint/no-explicit-any */

/**************************************************************
 *                     ADD RESOLVERS HERE                     *
 **************************************************************
 * Add all the resolvers you create to the                    *
 * 'resolverComponents` array following the 'QueryComponent'  *
 * structure.                                                 *
 *                                                            *
 * This file allows you to import your functions and then     *
 * automatically convert them into GraphQL resolver functions.*
 **************************************************************/

import { GraphQLSchema } from 'graphql';
import { addResolversToSchema } from '@graphql-tools/schema';
import logger from '../../utils/logger';
import { GraphQLContext } from '../../context';
import Dummy from './Dummy';
import Movie from './Movie';
import Actor from './Actor';
import MovieActor from './MovieActor';

interface QueryComponent {
  name: string;
  component: {
    query: {
      [resolverName: string]: (
        parent: any,
        args: any,
        context: GraphQLContext,
      ) => any;
    };
    resolver: {
      [resolverName: string]: (
        parent: any,
        args: any,
        context: GraphQLContext,
      ) => any;
    };
  };
}

const resolverComponents: QueryComponent[] = [
  { name: 'Dummy', component: Dummy },
  { name: 'Movie', component: Movie },
  { name: 'Actor', component: Actor },
  { name: 'MovieActor', component: MovieActor },
];

/**************************************************************
 *                DO NOT MODIFY BELOW THIS LINE               *
 **************************************************************/

export const loadQueryResolvers = (schema: GraphQLSchema): GraphQLSchema => {
  addResolversToSchema({
    schema,
    resolvers: {
      Query: {
        health: () => {
          return 'Service is running';
        },
      },
    },
    updateResolversInPlace: true,
  });
  logger.info(`Loaded query resolver health`);

  resolverComponents.forEach(({ name: componentName, component }) => {
    Object.entries(component.query).forEach(([queryName, queryResolver]) => {
      try {
        addResolversToSchema({
          schema,
          resolvers: {
            Query: {
              [queryName]: queryResolver,
            },
          },
          updateResolversInPlace: true,
        });
        logger.info(`Loaded query resolver ${componentName}/${queryName}`);
      } catch (error: any) {
        logger.error(
          `Error while loading query resolver ${componentName}/${queryName}`,
        );
        logger.error(error);
        throw error;
      }
    });

    Object.entries(component.resolver).forEach(([queryName, queryResolver]) => {
      try {
        addResolversToSchema({
          schema,
          resolvers: {
            [componentName]: {
              [queryName]: queryResolver,
            },
          },
          updateResolversInPlace: true,
        });
        logger.info(`Loaded query resolver ${componentName}/${queryName}`);
      } catch (error: any) {
        logger.error(
          `Error while loading query resolver ${componentName}/${queryName}`,
        );
        logger.error(error);
        throw error;
      }
    });
  });

  return schema;
};
