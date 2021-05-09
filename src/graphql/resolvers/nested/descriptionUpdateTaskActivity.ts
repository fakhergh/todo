import { IResolverContext, ITaskActivity } from '../../../types';

export const DescriptionUpdateTaskActivity = {
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
  previousDescription: (taskActivity: ITaskActivity) =>
    taskActivity.descriptionMetaData.previousDescription,
  newDescription: (taskActivity: ITaskActivity) =>
    taskActivity.descriptionMetaData.newDescription,
};
