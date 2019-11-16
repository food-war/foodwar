import React, { Component } from 'react';
import RightContent from './RightContent';
import Login from './Login';
import './RightView.scss';

export default class RightView extends Component {
  render() {
    return (
      <div className="RightView vertical-middle">
        <RightContent>
          <Login />
        </RightContent>
      </div>
    );
  }
}
