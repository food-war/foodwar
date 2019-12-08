import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // login
    // Apply to every request
    console.log('setAuthToken login~!!!');
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // logout
    console.log('setAuthToken logout~!!!');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
