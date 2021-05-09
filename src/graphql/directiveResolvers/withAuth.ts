import { ApolloError, NextResolverFn } from 'apollo-server-express';

import { GraphQlErrors } from '../../constants';
import { IResolverContext } from '../../types';

export function withAuth(
  next: NextResolverFn,
  _: any,
  __: any,
  { user }: IResolverContext,
) {
  if (!user) {
    throw new ApolloError(GraphQlErrors.UnAuthenticatedException);
  }

  return next();
}
