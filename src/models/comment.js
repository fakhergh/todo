const { model, Schema } = require('mongoose');

const {
  mongooseSchemaOptions,
  TaskActivityActionByKey,
} = require('../constants');
const TaskActivityModel = require('./taskActivity');

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

module.exports = model('comment', commentSchema);
