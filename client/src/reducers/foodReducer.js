import { FOOD_GET_LIST } from '../actions/types';

const initialState = {
  list: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FOOD_GET_LIST:
      return {
        ...state,
      };
    default:
      return state;
  }
}
