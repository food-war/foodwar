import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const recomendSchema = new Schema({
  store_id: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});
const Recomend = mongoose.model('recomend', recomendSchema);
module.exports = Recomend;
