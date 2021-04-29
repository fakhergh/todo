const { ApolloError } = require('apollo-server-express');

const { GraphQlErrors } = require('../../../../constants');
const { generateToken } = require('../../../../utils/token');

async function resolver(
  _,
  { input: { email, password } },
  { models: { UserModel } },
) {
  const query = { email };

  const user = await UserModel.findOne(query);

  if (!user || !user.isValidPassword(password)) {
    throw new ApolloError(GraphQlErrors.InvalidCredentialsException);
  }

  const token = generateToken({ id: user._id });

  return token;
}

module.exports = resolver;
