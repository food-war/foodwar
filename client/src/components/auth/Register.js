import React, { Component } from 'react';
import './Register.scss';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
class Register extends Component {
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
    this.props.registerUser(user);
  };
  render() {
    return (
      <div className="register">
        <div className="title">푸드워에 처음 오셨나요?</div>
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
                <input
                  type="password"
                  name="password2"
                  value={this.state.password}
                  onChange={this.onChange}
                  placeholder="비밀번호를 다시 입력해주세요."
                  required
                />
              </div>
              <div>
                <button className="food-btn btnBig">이메일 링크 받기</button>
              </div>
            </form>
          </div>
        </div>
        <div className="content-footer">
          <span>뒤로가기</span>
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
  registerUser,
})(Register);
