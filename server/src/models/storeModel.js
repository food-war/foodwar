import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
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
});

const Store = mongoose.model('stores', StoreSchema);
module.exports = Store;
