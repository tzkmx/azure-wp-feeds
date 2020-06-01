const { ApolloServer, gql } = require('apollo-server-azure-functions')
const { resolvers } = require('./schema')

const typeDefs = gql`
  type Query {
    posts(domain: String!): [Post]
  }
  
  type Post {
    id: ID!
    title: String!
    url: String!
    content: String!
    excerpt: String!
    date: String
    date_utc: String
    image(size: String!): PostThumbnail
  }
  
  type PostThumbnail {
      url: String!
      width: Int!
      height: Int!
  }
`

const server = new ApolloServer({ typeDefs, resolvers })

exports.graphqlHandler = server.createHandler()