import { IResolverContext, ITaskActivity } from '../../../types';

export const TaskCreationActivity = {
  author: (
    taskActivity: ITaskActivity,
    __: any,
    { models: { UserModel } }: IResolverContext,
  ) => UserModel.findById(taskActivity.authorId),
  task: (
    taskActivity: ITaskActivity,
    __: any,
    { models: { TaskModel } }: IResolverContext,
  ) => TaskModel.findById(taskActivity.taskId),
};
