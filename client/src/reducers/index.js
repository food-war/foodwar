import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import foodReducer from './foodReducer';

export default combineReducers({
  auth: authReducer,
  food: foodReducer,
  errors: errorReducer,
});
