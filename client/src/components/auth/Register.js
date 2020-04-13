import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Register.scss';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
//withRouter 에서는 history, location, match 이 3가지 props를 제공해줌
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
    // this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // prop를 받을 때 실행되는 함수
  // 리액트 생명주기에서는 componentDidMount를 제일 많이 씀
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      // nextProps에 에러가 존재한다면..
      this.setState({ errors: nextProps.errors }); // state의 errors값을 변경
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    //앞단에서 비밀번호 검증 추가 (server - validateRegisterInput)
    if (newUser.password !== newUser.password2) {
      this.setState({
        errors: { password2: '비밀번호 확인필드가 일치하지 않습니다.' },
      });
    }
    this.props.registerUser(newUser, this.props.history); // history는 redux dev tool 에 찍기 위함
  };
  //뒤로가기
  goBack = () => {
    this.props.history.goBack();
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
                  type="text"
                  placeholder={
                    !isEmpty(this.state.errors.name) ? this.state.errors.name : '이름을 입력해주세요.'
                  }
                  name="name"
                  id="name"
                  value={!isEmpty(this.state.errors.name) ? '' : this.state.name.trim()}
                  onChange={this.onChange}
                  required
                />
              </div>
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
                  value={!isEmpty(this.state.errors.password) ? '' : this.state.password.trim()}
                  onChange={this.onChange}
                  placeholder={
                    !isEmpty(this.state.errors.password)
                      ? this.state.errors.password
                      : '비밀번호를 입력해주세요.'
                  }
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password2"
                  value={!isEmpty(this.state.errors.password2) ? '' : this.state.password2.trim()}
                  onChange={this.onChange}
                  placeholder={
                    !isEmpty(this.state.errors.password2)
                      ? this.state.errors.password2
                      : '비밀번호를 다시 입력해주세요.'
                  }
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
          <span onClick={this.goBack}>뒤로가기</span>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  //registerUser: state.registerUser,
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  registerUser,
})(withRouter(Register));
