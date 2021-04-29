const { ApolloError } = require('apollo-server-express');
const { pipeResolvers } = require('graphql-resolvers');

const { GraphQlErrors } = require('../../../../constants');

async function checkTaskAvailability(
  _,
  { id, input },
  { user, models: { TaskModel } },
) {
  const task = await TaskModel.findById(id);

  if (!task) {
    throw new ApolloError(GraphQlErrors.TaskNotExistsException);
  }

  if (!task.authorId.equals(user._id)) {
    throw new ApolloError(GraphQlErrors.UnauthorizedException);
  }

  return { task, input, authorId: user._id };
}

function resolver({ task, input, authorId }) {
  task.title = input.title;
  task.description = input.description;
  task.status = input.status;

  //todo:: check authorId for tracing activities
  task.historyAuthor = '507f191e810c19729de860ea' || authorId;

  return task.save();
}

module.exports = pipeResolvers(checkTaskAvailability, resolver);
