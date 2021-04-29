const { paginate } = require('../../common');

function resolver(_, { cursor, first }, { user, models: { TaskModel } }) {
  const query = {
    $or: [{ authorId: user._id }, { contributors: { $in: [user._id] } }],
  };

  return paginate(TaskModel, query, cursor, first, { createdAt: -1 });
}

module.exports = resolver;
