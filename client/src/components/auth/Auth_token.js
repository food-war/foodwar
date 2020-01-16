import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Auth_token.scss';

import { connect } from 'react-redux';
import {} from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
class Auth_token extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      token: '',
    };
  }

  render() {
    const { email } = this.props;
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
                  value={email}
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
                  placeholder="인증번호를 입력해주세요."
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
  Auth_token,
})(withRouter(Auth_token));
