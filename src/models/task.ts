import { Model, Schema, model } from 'mongoose';
import mongooseTrack from 'mongoose-track';

mongooseTrack.options = {
  author: {
    enabled: true,
    ref: 'user',
  },
};

import {
  TaskActivityActionByKey,
  TaskStatus,
  TaskStatusByKey,
  mongooseSchemaOptions,
} from '../constants';
import { ITask } from '../types';

import { TaskActivityModel } from './taskActivity';

const taskSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      historyIgnore: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: TaskStatus,
      default: TaskStatusByKey.open,
    },
    contributors: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  mongooseSchemaOptions,
);

taskSchema.plugin(mongooseTrack.plugin);

taskSchema.post('save', async function (task, next) {
  const taskActivities = task.history[0].changes.reduce(
    (bulk: any[], change: any) => {
      if (change.type === 'E') {
        switch (change.path[0]) {
          case 'title':
            bulk.push({
              taskId: task._id,
              // todo:: check the editor id
              authorId: task.authorId,
              titleMetaData: {
                previousTitle: change.before,
                newTitle: change.after,
              },
              action: TaskActivityActionByKey.titleUpdate,
            });
            break;
          case 'description':
            bulk.push({
              taskId: task._id,
              // todo:: check the editor id
              authorId: task.authorId,
              descriptionMetaData: {
                previousDescription: change.before,
                newDescription: change.after,
              },
              action: TaskActivityActionByKey.descriptionUpdate,
            });
            break;
          case 'status':
            bulk.push({
              taskId: task._id,
              // todo:: check the editor id
              authorId: task.authorId,
              statusMetaData: {
                previousStatus: change.before,
                newStatus: change.after,
              },
              action: TaskActivityActionByKey.statusChange,
            });
            break;
        }
      }

      return bulk;
    },
    [],
  );

  if (taskActivities.length) {
    await TaskActivityModel.create(taskActivities);
  }

  next();
});

export const TaskModel: Model<ITask> = model('task', taskSchema);
