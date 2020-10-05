import { GET_ERRORS, DELETE_STORE_LIST } from './types';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const nowUrl = window.location.href;

export const deleteStore = requestData => async (dispatch, getState) => {
  let requestUrl = process.env.REACT_APP_LOCAL_URL;
  if (nowUrl.indexOf('localhost') === -1) {
    requestUrl = process.env.REACT_APP_BACKEND_API_URL;
  }

  try {
    // console.log(requestData);
    const res = await axios.post(`${requestUrl}/api/recomend/delReco`, requestData);
    if (res.data) {
      dispatch({ type: DELETE_STORE_LIST, payload: res.data });
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
