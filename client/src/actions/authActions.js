import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { REGISTER_ACTION, GET_ERRORS, SET_CURRENT_USER } from './types';
import { REACT_APP_BACKEND_API_URL, REACT_APP_LOCAL_URL } from '../config/env';

const nowUrl = window.location.href;
// LOGIN
export const loginUser = (userData, history) => dispatch => {
  // console.log(`userData ${userData.email} ${userData.password}`);
  let requestUrl = REACT_APP_LOCAL_URL;
  if (nowUrl.indexOf('localhost') === -1) {
    requestUrl = REACT_APP_BACKEND_API_URL;
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  // 백엔드 api/user/login로 비동기 요청 보내기
  axios
    .post(`${requestUrl}/api/user/login`, userData, headers)
    .then(res => {
      const { success, token } = res.data;
      localStorage.token = token;
      localStorage.success = success;

      //set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);

      // dispatch({ type: LOGIN_ACTION });
      //Set current user
      dispatch(setCurrentUser(decoded));

      history.push('/store');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};

//set logged in user (현재 유저에 대한 정보 )
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
// Register User
export const registerUser = (userData, history) => dispatch => {
  let requestUrl = REACT_APP_LOCAL_URL;
  if (nowUrl.indexOf('localhost') === -1) {
    requestUrl = REACT_APP_BACKEND_API_URL;
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  // 백엔드 api/user/register 비동기 요청 보내기
  axios
    .post(`${requestUrl}/api/user/register`, userData, headers)
    .then(res => {
      // history.push('/login');
      alert(`입력하신 이메일(${userData.email})로 \n인증번호를 발송하였습니다.`);
      dispatch({ type: REGISTER_ACTION });
      history.push(`/register?email=${userData.email}`);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
  return {
    type: REGISTER_ACTION,
    payload: userData,
  };
};
