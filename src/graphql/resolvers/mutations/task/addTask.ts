import { IResolverContext } from '../../../../types';

function resolver(
  _: undefined,
  { input }: any,
  { user, models: { TaskModel } }: IResolverContext,
) {
  const taskData = { ...input, authorId: user._id, status: undefined };

  return new TaskModel(taskData).save();
}

export const addTask = resolver;
