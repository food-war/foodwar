import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  store_pk_address: {
    type: String,
    required: true,
  },
  store_id: {
    type: String,
    default: '',
  },
  store_name: {
    type: String,
    default: '',
  },
  store_category: {
    type: String,
    default: '',
  },
  store_hasBooking: {
    type: String,
    default: '',
  },
  store_promotionTitle: {
    type: String,
    default: '',
  },
  store_x: {
    type: String,
    default: '',
  },
  store_y: {
    type: String,
    default: '',
  },
  store_distance: {
    type: String,
    default: '',
  },
  store_imageSrc: {
    type: String,
    default: '',
  },
  store_virtualPhone: {
    type: String,
    default: '',
  },
  store_phone: {
    type: String,
    default: '',
  },
  store_roadAddr: {
    type: String,
    default: '',
  },
  store_commonAddr: {
    type: String,
    default: '',
  },
  store_addr: {
    type: String,
    default: '',
  },
  store_blogCafeReviewCount: {
    type: String,
    default: '',
  },
  store_bookingReviewCount: {
    type: String,
    default: '',
  },
  store_totalReviewCount: {
    type: String,
    default: '',
  },
  store_tags: {
    type: [String],
    default: '',
  },
  store_priceCategory: {
    type: String,
    default: '',
  },
  store_url: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const Store = mongoose.model('stores', StoreSchema);
module.exports = Store;
