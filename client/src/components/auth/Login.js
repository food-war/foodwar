import React, { Component } from 'react';
import './Login.scss';
import IconGithub from '../../lotties/IconGithub';
import IconFacebook from '../../lotties/IconFacebook';
import IconGoggle from '../../lotties/IconGoggle';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: false,
    };
  }
  componentDidUpdate() {}
  render() {
    return (
      <div className="Login">
        <div className="title">지금 푸드워를 시작하세요.</div>
        <div className="contents">
          <div className="inputGroup">
            <div>
              <input type="text" placeholder="이메일을 입력해주세요." />
            </div>
            <div>
              <input type="text" placeholder="비밀번호를 입력해주세요." />
            </div>
            <div>
              <button className="food-btn btnBig">시작하기</button>
            </div>
          </div>
          <div className="loginOthers">
            <div className="hr-sect">others</div>
            <div className="githubDiv">
              <div className="icon">
                <IconGithub isStopped={false} />
              </div>
              <div className="text githubColor">github 로그인</div>
            </div>
            <div className="googleDiv">
              <div className="icon">
                <IconGoggle isStopped={false} />
              </div>
              <div className="text googleColor"> google 로그인</div>
            </div>
            <div className="facebookDiv">
              <div className="icon">
                <IconFacebook isStopped={false} />
              </div>
              <div className="text facebookColor"> facebook 로그인</div>
            </div>
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
