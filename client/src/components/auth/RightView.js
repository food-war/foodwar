import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import RightContent from './RightContent';
import Login from './Login';
import Register from './Register';
import Auth from './Auth_token';
import './RightView.scss';

export default class RightView extends Component {
  render() {
    return (
      <div className="RightView vertical-middle">
        <RightContent>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/register/:email">
            <Auth />
          </Route>
        </RightContent>
      </div>
    );
  }
}
