import { TEST_DISPATCH, LOGIN_ACTION, GET_ERRORS } from './types';
import axios from 'axios';
import { REACT_APP_BACKEND_API_URL, REACT_APP_LOCAL_URL } from '../config/env';

const nowUrl = window.location.href;
// LOGIN
export const loginUser = userData => dispatch => {
  //console.log(`userData ${userData.email} ${userData.password}`);
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
      //console.log(res.data);
      const { success, token } = res.data;
      console.log(success, token);
      dispatch({ type: LOGIN_ACTION });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
  //테스트 코드 :
  //   axios({
  //     method: 'post',
  //     url: `${requestUrl}/api/user/login`,
  //     data: {
  //       email: userData.email,
  //       password: userData.password,
  //     },
  //   });

  return {
    type: LOGIN_ACTION,
    payload: userData,
  };
};
// Register User
export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData,
  };
};
