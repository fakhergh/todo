import { Document, Types } from 'mongoose';

export interface IComment extends Document {
  taskId: Types.ObjectId;
  authorId: Types.ObjectId;
  content: string;
}
