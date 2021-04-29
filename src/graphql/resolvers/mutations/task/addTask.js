function resolver(_, { input }, { user, models: { TaskModel } }) {
  const taskData = { ...input, authorId: user._id, status: undefined };

  return new TaskModel(taskData).save();
}

module.exports = resolver;
