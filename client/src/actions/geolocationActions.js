import { GET_GEOLOCATION_PENDING, GET_GEOLOCATION_SUCCESS, GET_GEOLOCATION_FAILURE } from './types';

/** 현재 위치 가져오기 로딩 처리 */
export const geolocationPending = () => dispatch => {
  dispatch({ type: GET_GEOLOCATION_PENDING });
};

/** 현재 위치 가져오기 성공 처리 */
export const geolocationSuccess = address => dispatch => {
  dispatch({ type: GET_GEOLOCATION_SUCCESS, payload: address });
};

/** 현재 위치 가져오기 실패 처리 */
export const geolocationFailure = errorMessage => dispatch => {
  dispatch({ type: GET_GEOLOCATION_FAILURE, payload: errorMessage });
};
