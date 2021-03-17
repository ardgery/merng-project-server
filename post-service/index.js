const { GraphQLServerLambda } = require('graphql-yoga')
const resolvers = require('./resolvers')

const lambda = new GraphQLServerLambda({
    typeDefs: "./schema.graphql",
    resolvers
})

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler