/* eslint-disable @typescript-eslint/no-explicit-any */
import { addResolversToSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import logger from '../../utils/logger';
import Dummy from './Dummy';
import { GraphQLContext } from '../../context';

/**************************************************************
 *                     ADD RESOLVERS HERE                     *
 **************************************************************
 * Add all the resolvers you create to the                    *
 * 'resolverComponents` array following the                   *
 * 'MutationComponent' structure.                             *
 *                                                            *
 * This file allows you to import your functions and then     *
 * automatically convert them into GraphQL resolver functions.*
 **************************************************************/

export interface MutationComponent {
  name: string;
  component: {
    mutation: {
      [resolverName: string]: (
        parent: any,
        args: any,
        context: GraphQLContext,
      ) => any;
    };
  };
}

const resolverComponents: MutationComponent[] = [
  { name: 'Dummy', component: Dummy },
];

/**************************************************************
 *                DO NOT MODIFY BELOW THIS LINE               *
 **************************************************************/

export const loadMutationResolvers = (schema: GraphQLSchema): GraphQLSchema => {
  resolverComponents.forEach(({ name: componentName, component }) => {
    Object.entries(component.mutation).forEach(
      ([mutationName, mutationResolver]) => {
        try {
          addResolversToSchema({
            schema,
            resolvers: {
              Mutation: {
                [mutationName]: mutationResolver,
              },
            },
            updateResolversInPlace: true,
          });
          logger.info(
            `Loaded mutation resolver ${componentName}/${mutationName}`,
          );
        } catch (error: any) {
          logger.error(
            `Error while loading mutation resolver ${componentName}/${mutationName}`,
          );
          logger.error(error);
          throw error;
        }
      },
    );
  });

  return schema;
};
