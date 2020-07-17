import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import Menu from '../lotties/Menu';
import './Sidebar.scss';
import setAuthToken from '../utils/setAuthToken';
import {logoutUser} from '../actions/authActions';

import {connect} from 'react-redux';


// export default class Sidebar extends Component {
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: true,
      pathName: window.location.pathname !== "/" 
        ? window.location.pathname : '/store',
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
      pathName: window.location.pathname,
    });
  };

  logOut = () => {
    // if(window.localStorage.token){
    //   window.localStorage.clear();
    //   alert('정상적으로 로그아웃 되었습니다.');
    //   window.location.reload();
    //   setAuthToken();
    // }
    alert('정상적으로 로그아웃 되었습니다.');
    this.props.logoutUser(this.props.history);
  }
  
  addClass = (element, className) => { 
    element.className += " " + className; 
  };

  menuFocus = (e) => {
    //모바일일떄
    if(e.target.parentNode.className.includes('mobile-item')){
      $('.mobile-item').removeClass('mobile-selected');
      this.addClass(e.target.parentNode,'mobile-selected');
    } else {
      $('.item').removeClass('selected');
      this.addClass(e.target.parentNode,'selected');
    }
  }

  render() {
    return (
      <>
        {/* 모바일 */}
        <div id="mobile-toggle-menu-list">
          <div className={"mobile-item " + (this.state.pathName ==="/store" && "mobile-selected")} 
              onClick={this.menuFocus}>
            <Link to="/store">주변 식당 찾기</Link>
          </div>
          <div className={"mobile-item " + (this.state.pathName ==="/recomend" && "mobile-selected")} 
              onClick={this.menuFocus}>
            <Link to="/recomend">식당 추천 받기</Link>
          </div>
          <div className="mobile-item" onClick={this.menuFocus}><Link to="/test">마이페이지</Link></div>
          <div className="mobile-item" onClick={this.logOut}>로그 아웃</div>
        </div>

        {/* pc */}
        <div className="Sidebar">
          <div className="logo">Food war</div>
          <div className="menu">
            <div className={"item "+ (this.state.pathName==="/store" && "selected")} onClick={this.menuFocus}> 
              <Link to="/store">주변 식당 찾기</Link>
            </div>
            <div className={"item "+ (this.state.pathName==="/recomend" && "selected")} onClick={this.menuFocus}>
              <Link to="/recomend">식당 추천 받기</Link>
            </div>
            <div className="item" onClick={this.menuFocus}>마이페이지</div>
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps,{
  logoutUser,
})(withRouter(Sidebar))