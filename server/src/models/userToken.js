import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    maxlength: 65,
    required: true,
  },
  EndDate: {
    type: String,
    default: Date.now,
  },
});

const Token = mongoose.model('token', TokenSchema);
module.exports = Token;
