const { ApolloError } = require('apollo-server-express');

const { GraphQlErrors } = require('../../constants');

function resolver(next, source, args, { user }) {
  if (!user) {
    throw new ApolloError(GraphQlErrors.UnAuthenticatedException);
  }

  return next();
}

module.exports = resolver;
