import { Model } from 'mongoose';

import { IUser } from './user';

export interface IResolverContext {
  models: { [key: string]: Model<any> };
  user?: IUser | null;
}
