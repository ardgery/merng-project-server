const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req }) => ({ req, pubsub })
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongo connected")
        return server.listen({ port: PORT })
    })
    .then((res) => {
        console.log(`🚀  Server ready at ${res.url}`);
    })
    .catch(err => {
        console.error(err)
    });