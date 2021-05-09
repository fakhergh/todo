import { Model, Schema, model } from 'mongoose';

import { TaskActivityActionByKey, mongooseSchemaOptions } from '../constants';
import { IComment } from '../types';

import { TaskActivityModel } from './taskActivity';

const commentSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  mongooseSchemaOptions,
);

commentSchema.post('save', async function (comment, next) {
  try {
    const taskActivityData = {
      taskId: comment.taskId,
      authorId: comment.authorId,
      action: TaskActivityActionByKey.newComment,
    };

    await new TaskActivityModel(taskActivityData).save();

    next();
  } catch (e) {
    next(e);
  }
});

export const CommentModel: Model<IComment> = model('comment', commentSchema);
