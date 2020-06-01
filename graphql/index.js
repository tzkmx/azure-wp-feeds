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
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    tabs: [ {
     query: `
query DicesFeed($domain: String!) {
  dices: posts(domain: $domain) {
    ...postData
  }
}

fragment postData on Post {
  id
  title
  excerpt
  date_utc
}
`,
     variables: {
       "domain": "www.dices.mx"
     }
   } ]
  }
})

exports.graphqlHandler = server.createHandler()
