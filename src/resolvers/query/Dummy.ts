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

interface Dummy {
  id: string;
  name: string;
}

export const query = {
  // this should resolve to types as defined in the GraphQL schema
  dummy: (parent: unknown, args: { id: string }, context: GraphQLContext) => {
    return {
      id: `dummy-id-${args.id}`,
      name: context.prismaClientIsAvailableInTheContext,
    };
  },
  dummies: (parent: unknown, args: unknown, context: GraphQLContext) => {
    return [
      {
        id: `dummy-id-1`,
        name: context.prismaClientIsAvailableInTheContext,
      },
      {
        id: `dummy-id-2`,
        name: context.prismaClientIsAvailableInTheContext,
      },
    ];
  },
};

export const resolver = {
  // this should resolve the individual fields in the types as defined in the GraphQL schema
  id: (parent: Dummy) => {
    return parent.id;
  },

  name: (parent: Dummy) => {
    return parent.name;
  },
};

export default {
  query,
  resolver,
};
