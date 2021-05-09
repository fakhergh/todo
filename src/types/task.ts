import { Document, Types } from 'mongoose';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface ITask extends Document {
  authorId: Types.ObjectId;
  title: string;
  description?: string;
  status: TaskStatus;
  contributors: Array<Types.ObjectId>;
}
