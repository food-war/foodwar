import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import geolocationReducer from './geolocationReducer';
import storeReducer from './storeReducer';

export default combineReducers({
  auth: authReducer,
  geolocation: geolocationReducer,
  store: storeReducer,
  errors: errorReducer,
});
