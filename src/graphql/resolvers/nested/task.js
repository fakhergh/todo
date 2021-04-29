const { paginate } = require('../common');

module.exports = {
  author: (task, __, { models: { UserModel } }) =>
    UserModel.findById(task.authorId),
  isViewerAuthor: (task, __, { user }) => task.authorId.equals(user._id),
  contributors: (task, __, { models: { UserModel } }) =>
    UserModel.find({ _id: { $in: task.contributors } }),
  activities: (task, __, { models: { TaskActivityModel } }) =>
    TaskActivityModel.find({ taskId: task._id }),
  comments: (task, { cursor, first }, { models: { CommentModel } }) =>
    paginate(CommentModel, { taskId: task._id }, cursor, first, {
      createdAt: -1,
    }),
};
