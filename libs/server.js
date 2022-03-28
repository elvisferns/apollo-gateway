import { ApolloServer } from 'apollo-server';

export const createServer = ({
  typeDefs,
  resolvers,
  dataSources = () => ({}),
  port = 4000,
}) => {
  const server =  new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
  });

  server.listen({
    port
  }).then(() => {
    console.log(`
      Server is running!
      Listening on port ${port}
    `);
  });
}