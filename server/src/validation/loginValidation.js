const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isEmail(data.email)) {
    errors.email = '이메일 형식이 잘못되었습니다.';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = '이메일 필드를 입력해주세요.';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = '비밀번호 필드를 입력해주세요.';
  }

  if (validator.isNumeric(data.password)) {
    errors.password = '비밀번호는 숫자+영문 조합이여야 합니다.';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
