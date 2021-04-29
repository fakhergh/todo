module.exports = {
  author: (taskActivity, __, { models: { UserModel } }) =>
    UserModel.findById(taskActivity.authorId),
  task: (taskActivity, __, { models: { TaskModel } }) =>
    TaskModel.findById(taskActivity.taskId),
  assignee: (taskActivity, __, { models: { UserModel } }) =>
    UserModel.findById(taskActivity.assigneeId),
};
