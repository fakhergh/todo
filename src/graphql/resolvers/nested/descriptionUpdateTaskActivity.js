module.exports = {
  author: (taskActivity, __, { models: { UserModel } }) =>
    UserModel.findById(taskActivity.authorId),
  task: (taskActivity, __, { models: { TaskModel } }) =>
    TaskModel.findById(taskActivity.taskId),
  previousDescription: (taskActivity) =>
    taskActivity.descriptionMetaData.previousDescription,
  newDescription: (taskActivity) =>
    taskActivity.descriptionMetaData.newDescription,
};
