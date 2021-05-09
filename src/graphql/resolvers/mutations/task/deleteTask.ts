import { ApolloError } from 'apollo-server-express';

import { GraphQlErrors } from '../../../../constants';
import { IResolverContext, ITask } from '../../../../types';

async function resolver(
  _: undefined,
  { id }: any,
  { user, models: { TaskModel } }: IResolverContext,
) {
  const task: ITask | null = await TaskModel.findById(id);

  if (!task) {
    throw new ApolloError(GraphQlErrors.TaskNotExistsException);
  }

  if (!task.authorId.equals(user._id)) {
    throw new ApolloError(GraphQlErrors.UnauthorizedException);
  }

  await task.remove();

  return task;
}

export const deleteTask = resolver;
