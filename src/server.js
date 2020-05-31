const { ApolloServer, gql, AuthenticationError } = require('apollo-server-express');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
  	const token = req.headers.authorization || ''
    const splitToken = token.split(' ')[1]
    try {
        jwt.verify(splitToken, '12345')
    } catch (e) {
        throw new AuthenticationError(
            'Authentication token is invalid, please log in'
        )
    }

  },
  engine: {
    apiKey: "service:grecha:T7Nv_-x6La-zJvW_z34sRA",
    schemaTag: 'development',
  }
});