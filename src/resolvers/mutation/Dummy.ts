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
type DummyCreateInput = {
  name: string;
};
type DummyUpdateInput = {
  id: string;
} & DummyCreateInput;
type DummyDeleteInput = {
  id: string;
};

export const mutation = {
  createDummy: (
    parent: unknown,
    args: DummyCreateInput,
    context: GraphQLContext,
  ) => {
    return {
      id: `dummy-id-1`,
      name: `dummy-name-${args.name}-context-${context.thisFieldIsAvailableInGraphQl}`,
    };
  },
  updateDummy: (
    parent: unknown,
    args: DummyUpdateInput,
    context: GraphQLContext,
  ) => {
    return {
      id: `dummy-id-${args.id}`,
      name: `dummy-name-${args.id}-context-${context.thisFieldIsAvailableInGraphQl}`,
    };
  },
  deleteDummy: (
    parent: unknown,
    args: DummyDeleteInput,
    context: GraphQLContext,
  ) => {
    return {
      id: `dummy-id-${args.id}`,
      name: `dummy-name-${args.id}-context-${context.thisFieldIsAvailableInGraphQl}`,
    };
  },
};

export default {
  mutation,
};
