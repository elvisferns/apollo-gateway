import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { resolvers } from "./resolvers.js";
import { createServer } from '../libs/server.js';
import { join, dirname, } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const typeDefs = await loadSchema(join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
})

createServer({
  typeDefs,
  resolvers,
  port: 4003,
});
