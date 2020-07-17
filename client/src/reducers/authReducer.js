import isEmpty from '../validation/is-empty';
import {
  LOGIN_ACTION,
  REGISTER_ACTION,
  SET_CURRENT_USER,
  AUTH_TOKETN,
  SOCIAL_LOGIN,
  LOGOUT_ACTION,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_ACTION:
      return {
        ...state,
        user: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case AUTH_TOKETN:
      return {
        ...state,
        token: action.payload,
      };
    case SOCIAL_LOGIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
}
