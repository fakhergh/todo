import { ApolloError } from 'apollo-server-express';
import { combineResolvers } from 'graphql-resolvers';

import { GraphQlErrors } from '../../../../constants';
import { IResolverContext, IUser } from '../../../../types';
import { generateToken } from '../../../../utils/token';

async function checkUserDuplication(
  _: undefined,
  { input: { email } }: any,
  { models: { UserModel } }: IResolverContext,
) {
  const user: IUser | null = await UserModel.findOne({ email });

  if (user) {
    throw new ApolloError(GraphQlErrors.UserDuplicationException);
  }
}

async function resolver(
  _: undefined,
  { input }: any,
  { models: { UserModel } }: IResolverContext,
) {
  const user: IUser | null = await new UserModel(input).save();

  const token: string = generateToken({ id: user._id });

  return token;
}

export const signUp = combineResolvers(checkUserDuplication, resolver);
