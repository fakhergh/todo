import { IPaginationArgs, IResolverContext } from '../../../../types';
import { paginate } from '../../common';

function resolver(
  _: undefined,
  { cursor, first }: IPaginationArgs,
  { user, models: { TaskModel } }: IResolverContext,
) {
  const query = {
    $or: [{ authorId: user._id }, { contributors: { $in: [user._id] } }],
  };

  return paginate(TaskModel, query, cursor, first, { createdAt: -1 });
}

module.exports = resolver;
