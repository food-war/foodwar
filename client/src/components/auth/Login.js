import React, { Component } from 'react';
import './Login.scss';
import IconGithub from '../../lotties/IconGithub';
import IconFacebook from '../../lotties/IconFacebook';
import IconGoggle from '../../lotties/IconGoggle';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: false,
      email: '',
      password: '',
      errors: {},
    };
    // this.onChange = this.onChange.bind(this);
  }
  componentDidUpdate() {
    //document.getElementById('email').focus();
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    // console.log(user);
    this.props.loginUser(user);
  };
  render() {
    return (
      <div className="Login">
        <div className="title">지금 푸드워를 시작하세요.</div>
        <div className="contents">
          <div className="inputGroup">
            <form onSubmit={this.onSubmit}>
              <div>
                <input
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  placeholder="비밀번호를 입력해주세요."
                  required
                />
              </div>
              <div>
                <button className="food-btn btnBig">시작하기</button>
              </div>
            </form>
          </div>
          <div className="loginOthers">
            <div className="hr-sect">others</div>
            <div className="githubDiv">
              <div className="icon">
                <IconGithub isStopped={this.state.isStopped} />
              </div>
              <div className="text githubColor">github 로그인</div>
            </div>
            <div className="googleDiv">
              <div className="icon">
                <IconGoggle isStopped={this.state.isStopped} />
              </div>
              <div className="text googleColor"> google 로그인</div>
            </div>
            <div className="facebookDiv">
              <div className="icon">
                <IconFacebook isStopped={this.state.isStopped} />
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

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  loginUser,
})(Login);
