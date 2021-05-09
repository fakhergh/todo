import { ApolloError } from 'apollo-server-express';

import { GraphQlErrors } from '../../../../constants';
import { IResolverContext, IUser } from '../../../../types';
import { generateToken } from '../../../../utils/token';

async function resolver(
  _: undefined,
  { input: { email, password } }: any,
  { models: { UserModel } }: IResolverContext,
) {
  const query = { email };

  const user: IUser | null = await UserModel.findOne(query);

  if (!user || !user.isValidPassword(password)) {
    throw new ApolloError(GraphQlErrors.InvalidCredentialsException);
  }

  const token: string = generateToken({ id: user._id });

  return token;
}

export const signIn = resolver;
