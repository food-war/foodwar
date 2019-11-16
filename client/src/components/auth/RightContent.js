import React, { Component } from 'react';

class RightContent extends Component {
  render() {
    return (
      <div className="contents-box">
        {this.props.children}
      </div>
    );
  }
}

export default RightContent;
