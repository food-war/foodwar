const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validationTokenInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.token = !isEmpty(data.token) ? data.token : '';

  if (!validator.isEmail(data.email)) {
    errors.email = '이메일 형식이 잘못되었습니다.';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = '이메일 필드를 입력해주세요.';
  }

  if (validator.isEmpty(data.token)) {
    errors.token = '인증번호 필드를 입력해주세요.';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
