import { Document, Types } from 'mongoose';

import { TaskStatus } from './task';

type TaskActivityAction =
  | 'TASK_CREATION'
  | 'TITLE_UPDATE'
  | 'DESCRIPTION_UPDATE'
  | 'TASK_ASSIGNMENT'
  | 'NEW_COMMENT'
  | 'STATUS_CHANGE';

interface ITitleMetaData {
  previousTitle: string;
  newTitle: string;
}

interface IDescriptionMetaData {
  previousDescription: string;
  newDescription: string;
}

interface IStatusMetaData {
  previousStatus: TaskStatus;
  newStatus: TaskStatus;
}

export interface ITaskActivity extends Document {
  taskId: Types.ObjectId;
  authorId: Types.ObjectId;
  assigneeId?: Types.ObjectId;
  action: TaskActivityAction;
  titleMetaData?: ITitleMetaData;
  descriptionMetaData?: IDescriptionMetaData;
  statusMetaData?: IStatusMetaData;
}
