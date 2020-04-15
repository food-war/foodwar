import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Menu from '../lotties/Menu';
import './Sidebar.scss';
import setAuthToken from '../utils/setAuthToken';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: true,
    };
  }

  componentDidUpdate() {
    const { isStopped } = this.state;
    if (!isStopped) {
      $('#mobile-toggle-menu-list').css('display', 'block');
      $('#mobile-toggle-menu-list').animate({ left: '50%' }, 750);
    } else {
      $('#mobile-toggle-menu-list').animate({ left: '100%' }, 750, () => {
        $('#mobile-toggle-menu-list').css('display', 'none');
      });
    }
  }

  menuToggle = () => {
    this.setState({
      isStopped: !this.state.isStopped,
    });
  };

  logOut = () => {
    if(window.localStorage.token){
      window.localStorage.clear();
      alert('정상적으로 로그아웃 되었습니다.');
      window.location.reload();
      setAuthToken();
    }
  }
 
  render() {
    return (
      <>
        {/* 모바일 */}
        <div id="mobile-toggle-menu-list">
          <div className="mobile-item mobile-selected">
            <Link to="/store">주변 식당 찾기</Link>
          </div>
          <div className="mobile-item">
            <Link to="./recommend">식당 추천 받기</Link>
          </div>
          <div className="mobile-item">마이페이지</div>
          <div className="mobile-item" onClick={this.logOut}>로그 아웃</div>
        </div>

        {/* pc */}
        <div className="Sidebar">
          <div className="logo">Food war</div>
          <div className="menu">
            <div className="item selected"> 
              <Link to="/store">주변 식당 찾기</Link>
            </div>
            <div className="item">
              <Link to="./recommend">식당 추천 받기</Link>
            </div>
            <div className="item">마이페이지</div>
            <div className="item" onClick={this.logOut}>로그 아웃</div>
          </div>
          <div className="mobile-header">
            <div className="mobile-logo">Food war</div>
            <div className="mobile-menu" onClick={this.menuToggle}>
              <Menu isStopped={this.state.isStopped} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
