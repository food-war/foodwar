import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
  confirmToken: {
    type: Boolean,
    default: false,
  },
  userGubn: {
    type: String,
    required: true,
    default: 'user',
  },
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
