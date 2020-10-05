import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import FacebookLogin from 'react-facebook-login';
import IconGithub from '../../lotties/IconGithub';
import IconFacebook from '../../lotties/IconFacebook';
import IconGoggle from '../../lotties/IconGoggle';

import { connect } from 'react-redux';
import { loginUser, socialLogin } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';

import './Login.scss';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: false,
      email: '',
      password: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
  }

  // prop를 받을 때 실행되는 함수
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({
      errors: {},
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    // console.log(user);
    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const responseFacebook = response => {
      const facebookUser = {
        id: response.userID,
        name: response.name,
        email: response.email,
        password: 'facebook',
        token: response.accessToken,
        picture: response.picture.data.url,
        userGubn: response.graphDomain, //facebook
      };
      this.setState({ ...facebookUser });
      // this.props.loginUser(facebookUser, this.props.history);
      this.props.socialLogin(facebookUser, this.props.history);
    };

    return (
      <div className="Login">
        <div className="title">지금 푸드워를 시작하세요.</div>
        <div className="contents">
          <div className="inputGroup">
            <form onSubmit={this.onSubmit}>
              <div>
                <input
                  type="email"
                  placeholder={
                    !isEmpty(this.state.errors.email) ? this.state.errors.email : '이메일을 입력해주세요.'
                  }
                  name="email"
                  id="email"
                  value={!isEmpty(this.state.errors.email) ? '' : this.state.email}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={!isEmpty(this.state.errors.password) ? '' : this.state.password}
                  onChange={this.onChange}
                  //placeholder="비밀번호를 입력해주세요."
                  placeholder={
                    !isEmpty(this.state.errors.password)
                      ? this.state.errors.password
                      : '비밀번호를 입력해주세요.'
                  }
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
              <div className="text facebookColor">
                <FacebookLogin
                  appId="473667476518556" //APP ID NOT CREATED YET
                  fields="name,email,picture" //user_location 은 foodwar 페이스북 앱에서 추가 권한 요청해야함
                  // scope="user_location"
                  callback={responseFacebook}
                  cssClass="my-facebook-button-class"
                  textButton="Facebook 로그인"
                  version="5.0"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="content-footer">
          <span>비밀번호를 잊어버리셨나요?</span>
          <span>
            <Link to="./register">푸드워에 처음 오셨나요?</Link>
          </span>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // errors: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  // user: state.user,
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  loginUser,
  socialLogin,
})(withRouter(Login));
