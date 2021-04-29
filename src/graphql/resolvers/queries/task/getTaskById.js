function resolver(_, { id }, { user, models: { TaskModel } }) {
  return TaskModel.findOne({ _id: id, authorId: user._id }).then((todo) => {
    if (!todo) return null;

    if (
      todo.authorId.equals(user._id) ||
      todo.contributors.indexOf(user._id) > -1
    ) {
      return todo;
    }
  });
}

module.exports = resolver;
