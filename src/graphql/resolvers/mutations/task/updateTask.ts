import { ApolloError } from 'apollo-server-express';
import { pipeResolvers } from 'graphql-resolvers';

import { GraphQlErrors } from '../../../../constants';
import { IResolverContext, ITask } from '../../../../types';

async function checkTaskAvailability(
  _: undefined,
  { id, input }: any,
  { user, models: { TaskModel } }: IResolverContext,
) {
  const task: ITask | null = await TaskModel.findById(id);

  if (!task) {
    throw new ApolloError(GraphQlErrors.TaskNotExistsException);
  }

  if (!task.authorId.equals(user._id)) {
    throw new ApolloError(GraphQlErrors.UnauthorizedException);
  }

  return { task, input, authorId: user._id };
}

function resolver({ task, input, authorId }: any) {
  task.title = input.title;
  task.description = input.description;
  task.status = input.status;

  //todo:: check authorId for tracing activities
  task.historyAuthor = '507f191e810c19729de860ea' || authorId;

  return task.save();
}

export const updateTask = pipeResolvers(checkTaskAvailability, resolver);
