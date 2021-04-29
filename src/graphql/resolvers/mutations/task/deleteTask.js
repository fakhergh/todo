const { ApolloError } = require('apollo-server-express');

const { GraphQlErrors } = require('../../../../constants');

async function resolver(_, { id }, { user, models: { TaskModel } }) {
  const task = await TaskModel.findById(id);

  if (!task) {
    throw new ApolloError(GraphQlErrors.TaskNotExistsException);
  }

  if (!task.authorId.equals(user._id)) {
    throw new ApolloError(GraphQlErrors.UnauthorizedException);
  }

  await task.remove();

  return task;
}

module.exports = resolver;
