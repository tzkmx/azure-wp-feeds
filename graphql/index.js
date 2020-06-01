const { ApolloServer, gql } = require('apollo-server-azure-functions')

const typeDefs = gql`
    type Query {
        hello: String!
    }
`

const resolvers = {
  Query: {
    hello: () => 'hello World!'
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

exports.graphqlHandler = server.createHandler()