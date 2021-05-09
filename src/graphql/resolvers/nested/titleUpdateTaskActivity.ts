import { IResolverContext, ITaskActivity } from '../../../types';

export const TitleUpdateTaskActivity = {
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
  previousTitle: (taskActivity: ITaskActivity) =>
    taskActivity.titleMetaData.previousTitle,
  newTitle: (taskActivity: ITaskActivity) =>
    taskActivity.titleMetaData.newTitle,
};
