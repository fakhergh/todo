module.exports = {
  author: (taskActivity, __, { models: { UserModel } }) =>
    UserModel.findById(taskActivity.authorId),
  task: (taskActivity, __, { models: { TaskModel } }) =>
    TaskModel.findById(taskActivity.taskId),
  previousStatus: (taskActivity) => taskActivity.statusMetaData.previousStatus,
  newStatus: (taskActivity) => taskActivity.statusMetaData.newStatus,
};
