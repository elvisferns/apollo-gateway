import { ApolloServer } from 'apollo-server';
import { makeGatewaySchema } from "./schema.js";

const schema = await makeGatewaySchema();
const PORT = 8000;

const server =  new ApolloServer({
  schema
});

server.listen({
  port: PORT
}).then(() => {
  console.log(`
    Server is running!
    Listening on port ${PORT}
  `);
});