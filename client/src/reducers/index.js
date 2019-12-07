import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import storeReducer from './storeReducer';

export default combineReducers({
  auth: authReducer,
  store: storeReducer,
  errors: errorReducer,
});
