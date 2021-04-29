const { ApolloError } = require('apollo-server-express');
const { combineResolvers } = require('graphql-resolvers');

const { GraphQlErrors } = require('../../../../constants');

async function checkTaskAvailability(
  _,
  { taskId },
  { user, models: { TaskModel } },
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

function resolver(_, { taskId, input }, { user, models: { CommentModel } }) {
  const commentData = {
    taskId,
    authorId: user._id,
    ...input,
  };

  return new CommentModel(commentData).save();
}

module.exports = combineResolvers(checkTaskAvailability, resolver);
