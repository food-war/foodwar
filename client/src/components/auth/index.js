import React, { Component } from 'react';
import LeftView from './LeftView';
import RightView from './RightView';
import './index.scss';

export default class index extends Component {
  render() {
    return (
      <div className="auth">
        <div className="float-left left-view vertical-middle-wrap">
          <LeftView />
        </div>
        <div className="float-left right-view vertical-middle-wrap">
          <RightView />
        </div>
      </div>
    );
  }
}
