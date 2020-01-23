import {
  GET_ERRORS,
  GET_STORE_LIST_PENDING,
  GET_STORE_LIST_SUCCESS,
  // GET_STORE_LIST_FAILURE,
} from './types';
import axios from 'axios';
import { REACT_APP_LOCAL_URL, REACT_APP_BACKEND_API_URL } from '../config/env';

const nowUrl = window.location.href;

/** 음식점 목록을 가져오는 함수 */
export const getStoreList = address => dispatch => {
  dispatch({ type: GET_STORE_LIST_PENDING });

  let requestUrl = REACT_APP_LOCAL_URL;
  if (nowUrl.indexOf('localhost') === -1) {
    requestUrl = REACT_APP_BACKEND_API_URL;
  }

  const requstData = {
    address,
  };

  axios
    .post(`${requestUrl}/api/store/list`, requstData)
    .then(res => {
      dispatch({ type: GET_STORE_LIST_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors,
      });
    });
};
