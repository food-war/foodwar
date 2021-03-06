import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Auth_token.scss';

import { connect } from 'react-redux';
import { AuthToken } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
class Auth_token extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      token: '',
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  //react V16.3 이후 추가된 라이프사이클
  //컴포넌트가 최초 마운팅 됐을 경우와 부모 컴포넌트에서 전달해주는 props가 변경 되었을 경우 호출되며,
  //render() 메서드가 호출되기 이전에 호출된다.
  //전달받은 props를 state에 동기화 시키는 용도로 사용.
  static getDerivedStateFromProps(props, state) {
    // :email match.params로 받아온 이메일을 render되기전 email에 넣어줌
    if (!isEmpty(state.errors)) {
      return { email: props.match.params.email, token: '' };
    } else {
      return { email: props.match.params.email, errors: props.errors };
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

    const data = {
      email: this.state.email,
      token: this.state.token,
    };
    this.props.AuthToken(data, this.props.history); // history는 redux dev tool 에 찍기 위함
    //this.props.AuthToken(data);
    this.setState({ token: '' });
  };
  //뒤로가기
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div className="auth_token">
        <div className="title">회원가입 인증</div>
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
                  name="token"
                  // value={!isEmpty(this.state.errors.password) ? '' : this.state.token}
                  value={this.state.token}
                  onChange={this.onChange}
                  placeholder={
                    !isEmpty(this.state.errors.password)
                      ? this.state.errors.password
                      : '인증번호를 입력해주세요.'
                  }
                  required
                />
              </div>

              <div>
                <button className="food-btn btnBig">인증 안료</button>
              </div>
            </form>
          </div>
        </div>
        <div className="content-footer">
          <span onClick={this.goBack}>뒤로가기</span>
        </div>
      </div>
    );
  }
}

Auth_token.propTypes = {
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  errors: state.errors,
});
export default connect(mapStateToProps, {
  AuthToken,
})(withRouter(Auth_token));
