import { DELETE_STORE_LIST } from '../actions/types';

const initialState = {
  requestData: {
    store_id: [],
  },
  pending: false,
  error: false,
  delete_list: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_STORE_LIST:
      return {
        ...state,
        requestData: {
          store_id: action.payload.data,
        },
        delete_list: [...state.delete_list, action.payload.data],
      };
    default:
      return state;
  }
}
