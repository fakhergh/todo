import { IUser } from '../../../types';
import { capitalize } from '../../../utils/formatter';

export const User = {
  displayName: (user: IUser) =>
    capitalize(user.firstName) + ' ' + capitalize(user.lastName),
};
