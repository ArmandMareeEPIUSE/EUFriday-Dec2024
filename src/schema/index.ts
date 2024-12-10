/**************************************************************
 *                        DO NOT MODIFY                       *
 **************************************************************
 * This file reads all .gql files in the current directory.   *
 * Then it places them in one long string called `typeDefs`.  *
 * Then it pulls in the resolvers from '../resolvers',        *
 * and combines the schema and resolvers into an              *
 * 'executableSchema' that GraphQL can use for executing      *
 * queries.                                                   *
 **************************************************************/

import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';
import fs, { readFileSync } from 'fs';
import logger from '../utils/logger';
import { loadQueryResolvers } from '../resolvers/query';
import { loadMutationResolvers } from '../resolvers/mutation';

type TypeDefLoaderFunction = () => string;

const loadTypeDefsFunctionsFromDir = (
  startPath: string,
  filter: string,
  relativePath: string = '.',
): TypeDefLoaderFunction[] => {
  if (!fs.existsSync(startPath)) {
    return [];
  }

  const files = fs.readdirSync(startPath);
  const typeDefLoaderFunctions: TypeDefLoaderFunction[] = [];

  files.forEach((file) => {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    const relativeFilePath = `${relativePath}/${file}`;

    if (stat.isDirectory()) {
      const subTypeDefLoaderFunctions = loadTypeDefsFunctionsFromDir(
        filename,
        filter,
        relativeFilePath,
      ); // recurse
      typeDefLoaderFunctions.push(...subTypeDefLoaderFunctions);
    } else if (filename.endsWith(filter)) {
      const typeDef = readFileSync(filename).toString();
      typeDefLoaderFunctions.push(() => {
        logger.info(`Loading schema ${relativeFilePath}`); // this will execute when makeExecutableSchema executes the function
        return typeDef;
      });
    }
  });

  return typeDefLoaderFunctions;
};

const typeDefs = loadTypeDefsFunctionsFromDir(__dirname, '.gql');

const schema = makeExecutableSchema({
  typeDefs: Object.values(typeDefs),
});

loadQueryResolvers(schema);
loadMutationResolvers(schema);

export default schema;
