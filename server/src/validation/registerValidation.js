const validator = require('validator');
const isEmpty = require('./is-empty');

// 검증해주는 함수를 만들고 바로 내보냄
module.exports = function validateRegisterInput(data) {
  let errors = {};

  // 여기서 쓰이는 isEmpty는 is-empty.js에서 만든 친구
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    // errors.name = 'Name must be between 2 and 30 characters';
    errors.name = `이름은 문자열 2~30자 로 입력해주세요.`;
  }

  // 여기서 쓰이는 isEmpty는 validator에서 제공해주는 함수
  if (validator.isEmpty(data.name)) {
    // errors.name = 'Name field is required';
    errors.name = '이름 필드를 입력해주세요.';
  }

  if (!validator.isEmail(data.email)) {
    //errors.email = 'Email is invalid';
    errors.email = '이메일 형식이 맞지 않습니다.';
  }

  if (validator.isEmpty(data.email)) {
    //errors.email = 'Email field is required';
    errors.email = '이메일 필드를 입력해주시기 바랍니다.';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    //errors.password = 'Password must be between 6 and 30 characters';
    errors.password = `비밀번호는 문자열 6~30자로 입력해주세요.`;
  }

  if (validator.isEmpty(data.password)) {
    // errors.password = 'password field is required';
    errors.password = '비밀번호 필드를 입력해주세요.';
  }

  if (validator.isEmpty(data.password2)) {
    // errors.password2 = 'password2 field is required';
    errors.password2 = '비밀번호 확인란을 입력해주세요.';
  }

  if (!validator.equals(data.password, data.password2)) {
    // errors.password2 = 'password must match';
    errors.password2 = '비밀번호가 일치하지 않습니다.';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
