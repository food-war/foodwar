import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, Register, Auth } from '../pages';
import Header from './Header';
import './Header.scss';

class Router extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={Auth} />
        {/* <Header />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> */}
      </>
    );
  }
}

export default Router;
