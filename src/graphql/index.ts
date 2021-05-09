import { makeExecutableSchema } from 'apollo-server-express';

import * as directiveResolvers from './directiveResolvers';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

export default makeExecutableSchema({
  resolvers,
  typeDefs,
  directiveResolvers,
});
