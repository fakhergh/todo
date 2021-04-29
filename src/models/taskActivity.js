const { model, Schema } = require('mongoose');

const {
  mongooseSchemaOptions,
  TaskActivityActions,
  TaskStatus,
} = require('../constants');

const titleMetaDataSchema = new Schema(
  {
    previousTitle: {
      type: String,
      required: true,
    },
    newTitle: {
      type: String,
      required: true,
    },
  },
  { _id: false, versionKey: false },
);

const descriptionMetaDataSchema = new Schema(
  {
    previousDescription: {
      type: String,
      required: true,
    },
    newDescription: {
      type: String,
      required: true,
    },
  },
  { _id: false, versionKey: false },
);

const statusMetaDataSchema = new Schema(
  {
    previousStatus: {
      type: String,
      enum: TaskStatus,
      required: true,
    },
    newStatus: {
      type: String,
      enum: TaskStatus,
      required: true,
    },
  },
  { _id: false, versionKey: false },
);

const taskActivitySchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    taskId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    action: {
      type: String,
      enum: TaskActivityActions,
      required: true,
    },
    assigneeId: Schema.Types.ObjectId,
    titleMetaData: titleMetaDataSchema,
    descriptionMetaData: descriptionMetaDataSchema,
    statusMetaData: statusMetaDataSchema,
  },
  mongooseSchemaOptions,
);

module.exports = model('taskActivity', taskActivitySchema);
