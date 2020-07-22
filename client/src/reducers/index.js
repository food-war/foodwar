import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import geolocationReducer from './geolocationReducer';
import storeReducer from './storeReducer';
import recomendReducer from './recomendReducer';

export default combineReducers({
  auth: authReducer,
  geolocation: geolocationReducer,
  recomend: recomendReducer,
  store: storeReducer,
  errors: errorReducer,
});
