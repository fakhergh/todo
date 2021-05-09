import { compareSync } from 'bcrypt';
import { Model, Schema, model } from 'mongoose';

import { IUser } from '../types';
import { hashPassword } from '../utils/password';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', function (next) {
  const self = this as any;

  if (this.isModified('password') && this.isNew) {
    self.password = hashPassword(self.password);
    next();
  } else {
    next();
  }
});

userSchema.methods.isValidPassword = function (password) {
  const self = this as any;

  return compareSync(password, self.password);
};

userSchema.statics.hash = hashPassword;

export const UserModel: Model<IUser> = model('user', userSchema);
