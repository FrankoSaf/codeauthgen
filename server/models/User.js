const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [isEmail, 'Invalid email'],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    firstName: {
      type: String,
      minLength: 3,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    resetLink: { type: String, default: '' },
    githubID: String,
    googleID: String
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
