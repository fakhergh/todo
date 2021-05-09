import { IResolverContext, ITaskActivity } from '../../../types';

export const StatusUpdateTaskActivity = {
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
  previousStatus: (taskActivity: ITaskActivity) =>
    taskActivity.statusMetaData.previousStatus,
  newStatus: (taskActivity: ITaskActivity) =>
    taskActivity.statusMetaData.newStatus,
};
