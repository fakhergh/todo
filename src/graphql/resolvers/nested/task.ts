import { IPaginationArgs, IResolverContext, ITask } from '../../../types';
import { paginate } from '../common';

export const Task = {
  author: (task: ITask, __: any, { models: { UserModel } }: IResolverContext) =>
    UserModel.findById(task.authorId),
  isViewerAuthor: (task: ITask, __: any, { user }: IResolverContext) =>
    task.authorId.equals(user._id),
  contributors: (
    task: ITask,
    __: any,
    { models: { UserModel } }: IResolverContext,
  ) => UserModel.find({ _id: { $in: task.contributors } }),
  activities: (
    task: ITask,
    __: any,
    { models: { TaskActivityModel } }: IResolverContext,
  ) => TaskActivityModel.find({ taskId: task._id }),
  comments: (
    task: ITask,
    { cursor, first }: IPaginationArgs,
    { models: { CommentModel } }: IResolverContext,
  ) =>
    paginate(CommentModel, { taskId: task._id }, cursor, first, {
      createdAt: -1,
    }),
};
