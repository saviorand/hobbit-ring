const { ApolloServer, gql, AuthenticationError } = require('apollo-server-express');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const MyDatabase = require("./dbqueries");
const jwt = require('jsonwebtoken');

const knexConfig = {
  client: "pg",
  connection: {
      connectionString: process.env.DATABASE_URL,
    /* CONNECTION INFO */
  }
};

const db = new MyDatabase(knexConfig);


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
  dataSources: () => ({ db }),
  engine: {
    apiKey: "service:grecha:T7Nv_-x6La-zJvW_z34sRA",
    graphVariant: 'development',
  }
});