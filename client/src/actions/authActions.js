import { TEST_DISPATCH, LOGIN_ACTION } from './types';

// LOGIN
export const loginUser = userData => {
  console.log(`userData ${userData.email} ${userData.password}`);
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
