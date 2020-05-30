const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: "service:grecha:T7Nv_-x6La-zJvW_z34sRA",
    schemaTag: 'development',
  }
});