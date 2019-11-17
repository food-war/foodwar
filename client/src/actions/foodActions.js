import { GET_ERRORS, FOOD_GET_LIST } from './types';
import axios from 'axios';
import { REACT_APP_LOCAL_URL, REACT_APP_BACKEND_API_URL } from '../config/env';

const nowUrl = window.location.href;

/** 음식점 목록을 가져오는 함수 */
export const foodGetList = (requstData = { page: 1 }) => dispatch => {
  let requestUrl = REACT_APP_LOCAL_URL;
  if (nowUrl.indexOf('localhost') === -1) {
    requestUrl = REACT_APP_BACKEND_API_URL;
  }

  axios
    .post(`${requestUrl}/api/food/list`, requstData)
    .then(res => {
      dispatch({ type: FOOD_GET_LIST });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors,
      });
    });
};
