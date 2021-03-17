import { ApolloServer } from 'apollo-server-lambda';
import lambdaPlayground from 'graphql-playground-middleware-lambda';

import schema from '../schema';

const ENABLE_INTROSPECTION = process.env.STAGE !== 'prod';

const server = new ApolloServer({
  schema,
  playground: ENABLE_INTROSPECTION,
  introspection: ENABLE_INTROSPECTION,
});

export const graphQlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});

export const playgroundHandler = lambdaPlayground({
  endpoint: `/${process.env.STAGE}/graphql`,
});
