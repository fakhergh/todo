import { IResolvers } from 'apollo-server-express';

import { IResolverContext } from '../../types';

import * as Mutation from './mutations';
import * as Nested from './nested';
import * as Query from './queries';

export default { Query, Mutation, ...Nested } as IResolvers<
  any,
  IResolverContext
>;
