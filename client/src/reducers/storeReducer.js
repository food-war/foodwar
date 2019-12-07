import { GET_STORE_LIST } from '../actions/types';

const initialState = {
  list: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STORE_LIST:
      return {
        ...state,
      };
    default:
      return state;
  }
}
