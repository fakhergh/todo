const { ApolloError } = require('apollo-server-express');
const { combineResolvers } = require('graphql-resolvers');

const { generateToken } = require('../../../../utils/token');
const { GraphQlErrors } = require('../../../../constants');

async function checkUserDuplication(
  _,
  { input: { email } },
  { models: { UserModel } },
) {
  const user = await UserModel.findOne({ email });

  if (user) {
    throw new ApolloError(GraphQlErrors.UserDuplicationException);
  }
}

async function resolver(_, { input }, { models: { UserModel } }) {
  const user = await new UserModel(input).save();

  const token = generateToken({ id: user._id });

  return token;
}

module.exports = combineResolvers(checkUserDuplication, resolver);
