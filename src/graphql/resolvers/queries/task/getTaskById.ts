import { IResolverContext, ITask } from '../../../../types';

function resolver(
  _: undefined,
  { id }: any,
  { user, models: { TaskModel } }: IResolverContext,
) {
  return TaskModel.findOne({ _id: id, authorId: user._id }).then(
    (todo: ITask) => {
      if (!todo) return null;

      if (
        todo.authorId.equals(user._id) ||
        todo.contributors.indexOf(user._id) > -1
      ) {
        return todo;
      }
    },
  );
}

export const getTaskById = resolver;
