const { compareSync } = require('bcrypt');
const { model, Schema } = require('mongoose');

const { hashPassword } = require('../utils/password');

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
  if (this.isModified('password') && this.isNew) {
    this.password = hashPassword(this.password);
    next();
  } else {
    next();
  }
});

userSchema.methods.isValidPassword = function (password) {
  return compareSync(password, this.password);
};

userSchema.statics.hash = hashPassword;

module.exports = model('user', userSchema);
