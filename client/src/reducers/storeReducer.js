import {
  GET_STORE_LIST_PENDING,
  GET_STORE_LIST_SUCCESS,
  GET_STORE_LIST_FAILURE,
} from '../actions/types';

const initialState = {
  pending: false,
  error: false,
  list: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STORE_LIST_PENDING:
      return {
        ...state,
        pending: true,
        error: false,
        list: [],
      };
    case GET_STORE_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        error: false,
        list: action.payload,
      };
    case GET_STORE_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        error: true,
        list: [],
      };
    default:
      return state;
  }
}
