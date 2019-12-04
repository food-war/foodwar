import { TEST_DISPATCH, LOGIN_ACTION, REGISTER_ACTION } from '../actions/types';

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
    default:
      return state;
  }
}
