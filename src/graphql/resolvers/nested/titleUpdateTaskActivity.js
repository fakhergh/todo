module.exports = {
  author: (taskActivity, __, { models: { UserModel } }) =>
    UserModel.findById(taskActivity.authorId),
  task: (taskActivity, __, { models: { TaskModel } }) =>
    TaskModel.findById(taskActivity.taskId),
  previousTitle: (taskActivity) => taskActivity.titleMetaData.previousTitle,
  newTitle: (taskActivity) => taskActivity.titleMetaData.newTitle,
};
