import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    maxlength: 300,
    required: true,
  },
  EndDate: {
    type: String,
    default: Date.now,
  },
  tokenGubn: {
    type: String,
    required: true,
    default: 'user',
  },
});

const Token = mongoose.model('token', TokenSchema);
module.exports = Token;
