import {
  GET_GEOLOCATION_PENDING,
  GET_GEOLOCATION_SUCCESS,
  GET_GEOLOCATION_FAILURE,
} from '../actions/types';

const initialState = {
  pending: false,
  error: false,
  errorMessage: '',
  address: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GEOLOCATION_PENDING:
      return {
        ...state,
        pending: true,
        error: false,
        errorMessage: '',
        address: '',
      };
    case GET_GEOLOCATION_SUCCESS:
      return {
        ...state,
        pending: false,
        error: false,
        errorMessage: '',
        address: action.payload,
      };
    case GET_GEOLOCATION_FAILURE:
      return {
        ...state,
        pending: false,
        error: true,
        errorMessage: action.payload,
        address: '',
      };

    default:
      return state;
  }
}
