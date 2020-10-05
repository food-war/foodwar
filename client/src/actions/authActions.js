import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {
  REGISTER_ACTION,
  GET_ERRORS,
  SET_CURRENT_USER,
  AUTH_TOKETN,
  SOCIAL_LOGIN,
  LOGOUT_ACTION,
} from './types';
import dotenv from 'dotenv';
dotenv.config();

const nowUrl = window.location.href;
// LOGIN
export const loginUser = (userData, history) => async dispatch => {
  // console.log(`userData ${userData.email} ${userData.password}`);
  let requestUrl = process.env.REACT_APP_LOCAL_URL;
  if (nowUrl.indexOf('localhost') === -1) {
    requestUrl = process.env.REACT_APP_BACKEND_API_URL;
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  // 백엔드 api/user/login로 비동기 요청 보내기
  await axios
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
      window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};

export const socialLogin = (userData, history) => async dispatch => {
  let requestUrl = process.env.REACT_APP_LOCAL_URL;
  if (nowUrl.indexOf('localhost') === -1) {
    requestUrl = process.env.REACT_APP_BACKEND_API_URL;
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  // 백엔드 api/user/register 비동기 요청 보내기
  await axios
    .post(`${requestUrl}/api/user/social_login`, userData, headers)
    .then(res => {
      const { success, token } = res.data;
      localStorage.token = token;
      localStorage.success = success;

      //set token to auth header
      setAuthToken(token);

      dispatch({ type: SOCIAL_LOGIN });
      history.push('/store');
      window.location.reload();
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

export const logoutUser = history => dispatch => {
  setAuthToken();
  localStorage.clear();
  dispatch({ type: LOGOUT_ACTION });
  history.push('/store');
  window.location.reload();
};
// Register User
export const registerUser = (userData, history) => async dispatch => {
  let requestUrl = process.env.REACT_APP_LOCAL_URL;
  if (nowUrl.indexOf('localhost') === -1) {
    requestUrl = process.env.REACT_APP_BACKEND_API_URL;
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  // 백엔드 api/user/register 비동기 요청 보내기
  await axios
    .post(`${requestUrl}/api/user/register`, userData, headers)
    .then(res => {
      // history.push('/login');
      alert(`입력하신 이메일(${userData.email})로 \n인증번호를 발송하였습니다.`);
      dispatch({ type: REGISTER_ACTION });
      history.push(`/register/${userData.email}`);
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
//회원 가입 인증위한 액션 생성함수
export const AuthToken = (data, history) => async dispatch => {
  // let requestUrl = process.env.REACT_APP_LOCAL_URL;
  // if (nowUrl.indexOf('localhost') === -1) {
  //   requestUrl = process.env.REACT_APP_BACKEND_API_URL;
  // }
  let requestUrl = process.env.REACT_APP_LOCAL_URL;
  if (nowUrl.indexOf('localhost') === -1) {
    requestUrl = process.env.REACT_APP_BACKEND_API_URL;
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  // 백엔드 api/user/register 비동기 요청 보내기
  await axios
    .post(`${requestUrl}/api/user/register/checkToken`, data, headers)
    .then(res => {
      alert('회원가입 인증이 완료되었습니다.');
      dispatch({ type: AUTH_TOKETN });
      history.replace('/login');
    })
    .catch(err => {
      //console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
  // console.log(data);
  // dispatch({ type: AUTH_TOKETN });
  return {
    type: AUTH_TOKETN,
    payload: data,
  };
};
