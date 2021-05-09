import { IComment, IResolverContext } from '../../../types';

export const Comment = {
  author: (
    comment: IComment,
    __: any,
    { models: { UserModel } }: IResolverContext,
  ) => UserModel.findById(comment.authorId),
  task: (
    comment: IComment,
    __: any,
    { models: { TaskModel } }: IResolverContext,
  ) => TaskModel.findById(comment.taskId),
  isViewerAuthor: (comment: IComment, __: any, { user }: IResolverContext) =>
    comment.authorId.equals(user._id),
};
