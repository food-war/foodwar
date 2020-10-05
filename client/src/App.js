import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import React, { Component } from 'react';
import Router from './layout/Router';
import { Provider } from 'react-redux';
import store from './store';

//check for token
// if (localStorage.token) {
//   //Set auth token header auth
//   setAuthToken(localStorage.token);

//   // Decode token and get user info and exp
//   const decoded = jwt_decode(localStorage.token);
//   //console.log(decoded);
//   // set user and isauthenticated
//   store.dispatch(setCurrentUser(decoded));
// }

class App extends Component {
  componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(setCurrentUser(localStorage.token));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
