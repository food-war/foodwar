import {
  GET_STORE_LIST_PENDING,
  GET_STORE_LIST_SUCCESS,
  GET_STORE_LIST_FAILURE,
  ADDRESS_UPDATE,
  DELETE_STORE_LIST,
} from '../actions/types';

const initialState = {
  requestData: {
    address: '',
    page: 1,
    limit: 20,
    filter: {
      search_selected: 'store_name',
      search_text: '',
      state: '1',
    },
  },
  pending: false,
  error: false,
  list: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDRESS_UPDATE:
      return {
        ...state,
        requestData: {
          ...action.payload,
        },
      };
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
    case DELETE_STORE_LIST:
      return {
        ...state,
      };
    default:
      return state;
  }
}
