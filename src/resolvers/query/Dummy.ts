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
  dummy: (parent: unknown, args: { id: string }, context: GraphQLContext) => {
    return {
      id: `dummy-id-${args.id}`,
      name: `dummy-name-${args.id}-context-${context.thisFieldIsAvailableInGraphQl}`,
    };
  },
  dummies: () => {
    return [
      {
        id: `dummy-id-1`,
        name: `dummy-name-1`,
      },
      {
        id: `dummy-id-2`,
        name: `dummy-name-2`,
      },
    ];
  },
};

export const resolver = {
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
