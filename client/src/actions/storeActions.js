import {
  GET_ERRORS,
  GET_STORE_LIST_PENDING,
  GET_STORE_LIST_SUCCESS,
  ADDRESS_UPDATE,
  DELETE_STORE_LIST,
} from './types';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const nowUrl = window.location.href;

/** 주소를 받아다가 state에 넣어주는 함수 */
export const updateAddress = requstData => dispatch => {
  dispatch({ type: ADDRESS_UPDATE, payload: requstData });
};

/** 음식점 목록을 가져오는 함수 */
export const getStoreList = requstData => dispatch => {
  dispatch({ type: ADDRESS_UPDATE, payload: requstData });
  dispatch({ type: GET_STORE_LIST_PENDING });

  let requestUrl = process.env.REACT_APP_LOCAL_URL;
  if (nowUrl.indexOf('localhost') === -1) {
    requestUrl = process.env.REACT_APP_BACKEND_API_URL;
  }

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

// export const deleteStore = requestData => dispatch => {
//   let requestUrl = process.env.REACT_APP_LOCAL_URL;
//   if (nowUrl.indexOf('localhost') === -1) {
//     requestUrl = process.env.REACT_APP_BACKEND_API_URL;
//   }

//   axios
//     .post(`${requestUrl}/api/recomend/test`, requestData)
//     .then(res => {
//       dispatch({ type: DELETE_STORE_LIST, payload: res.data });
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       });
//     });
// };
