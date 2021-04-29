module.exports = {
  author: (comment, __, { models: { UserModel } }) =>
    UserModel.findById(comment.authorId),
  task: (comment, __, { models: { TaskModel } }) =>
    TaskModel.findById(comment.taskId),
  isViewerAuthor: (comment, __, { user }) => comment.authorId.equals(user._id),
};
