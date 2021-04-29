const { makeExecutableSchema } = require('apollo-server-express');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const directiveResolvers = require('./directiveResolvers');

module.exports = makeExecutableSchema({
  resolvers,
  typeDefs,
  directiveResolvers,
});
