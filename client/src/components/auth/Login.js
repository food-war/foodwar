import React, { Component } from 'react';
import './Login.scss';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <div className="title">지금 푸드워를 시작하세요</div>
        <div className="contents">
          <div>
            <input type="text" />
          </div>
          <div>
            <input type="text" />
          </div>
          <div>
            <button>시작하기</button>
          </div>
        </div>
        <div className="content-footer">
          <span>비밀번호를 잊어버리셨나요?</span>
          <span>푸드워에 처음 오셨나요?</span>
        </div>
      </div>
    );
  }
}

export default Login;
