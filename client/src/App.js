import React, { Component } from 'react';
import Router from './layout/Router';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  componentDidMount() {
    if (!localStorage.test) {
      localStorage.setItem('token', 'test');
      //localStorage.clear();
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
