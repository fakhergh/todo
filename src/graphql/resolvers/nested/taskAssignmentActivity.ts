import { IResolverContext, ITaskActivity } from '../../../types';

export const TaskAssignmentActivity = {
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
  assignee: (
    taskActivity: ITaskActivity,
    __: any,
    { models: { UserModel } }: IResolverContext,
  ) => UserModel.findById(taskActivity.assigneeId),
};
