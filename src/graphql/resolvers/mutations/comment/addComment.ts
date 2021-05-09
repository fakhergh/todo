import { ApolloError } from 'apollo-server-express';
import { combineResolvers } from 'graphql-resolvers';

import { GraphQlErrors } from '../../../../constants';
import { IResolverContext } from '../../../../types';

async function checkTaskAvailability(
  _: undefined,
  { taskId }: any,
  { user, models: { TaskModel } }: IResolverContext,
) {
  const task = await TaskModel.findById(taskId);

  if (!task) {
    throw new ApolloError(GraphQlErrors.TaskNotExistsException);
  }

  if (
    !task.authorId.equals(user._id) &&
    task.contributors.indexOf(user._id) === -1
  ) {
    throw new ApolloError(GraphQlErrors.UnauthorizedException);
  }
}

function resolver(
  _: undefined,
  { taskId, input }: any,
  { user, models: { CommentModel } }: IResolverContext,
) {
  const commentData = {
    taskId,
    authorId: user._id,
    ...input,
  };

  return new CommentModel(commentData).save();
}

export const addComment = combineResolvers(checkTaskAvailability, resolver);
