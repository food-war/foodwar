import isEmpty from '../validation/is-empty';
import { TEST_DISPATCH, LOGIN_ACTION, REGISTER_ACTION, SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload,
      };
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
    default:
      return state;
  }
}
