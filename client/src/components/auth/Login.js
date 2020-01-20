import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import './Login.scss';

import IconGithub from '../../lotties/IconGithub';
import IconFacebook from '../../lotties/IconFacebook';
import IconGoggle from '../../lotties/IconGoggle';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';

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

  // prop를 받을 때 실행되는 함수
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   // static getDerivedStateFromProps(nextProps, state) {
  //   // alert('test!!!!!!!!!!!!');
  //   // console.log(nextProps);
  //   if (nextProps.errors) {
  //     //에러가 있을 alert창 띄워줌
  //     this.setState({ errors: nextProps.errors });
  //     alert(nextProps.errors.response.data.email);
  //   }
  // }
  static getDerivedStateFromProps(nextProps, state) {
    console.log(nextProps);
    if (Object.keys(nextProps.errors).length !== 0) {
      //error객체가 비어있지 않을경우
      alert(nextProps.errors.response.data.email);
    }
    // return { email: nextProps.match.params.email };
  }

  onChange = e => {
    this.setState({
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
      console.log(response);
      const userData = {
        email: this.state.email,
        password: this.state.password,
      };
      // console.log(user);
      this.props.loginUser(userData, this.props.history);
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
              <div className="text facebookColor" onClick={() => FacebookLogin.callback}>
                <FacebookLogin
                  appId="473667476518556" //APP ID NOT CREATED YET
                  fields="name,email,picture"
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
})(withRouter(Login));
