const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    console.log(data.email);
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    console.log(data.email);
    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}