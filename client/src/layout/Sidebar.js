import React, { Component } from 'react';
import $ from 'jquery';
import './Sidebar.scss';

export default class Sidebar extends Component {
  menuToggle = () => {
    const left = $('#mobile-toggle-menu-list').css('left');
    if (left === '100%') {
      $('#mobile-toggle-menu-list').css('display', 'block');
      $('#mobile-toggle-menu-list').animate({ left: '50%' }, 1000);
    } else {
      $('#mobile-toggle-menu-list').animate({ left: '100%' }, 1000, () => {
        $('#mobile-toggle-menu-list').css('display', 'none');
      });
    }
  };

  render() {
    return (
      <>
        <div id="mobile-toggle-menu-list">
          <div className="mobile-close">
            <span onClick={this.menuToggle}>X</span>
          </div>
          <div className="mobile-item mobile-selected">주변 식당 찾기</div>
          <div className="mobile-item">식당 추천 받기</div>
          <div className="mobile-item">마이페이지</div>
        </div>
        <div className="Sidebar">
          <div className="logo">Food war</div>
          <div className="menu">
            <div className="item selected">주변 식당 찾기</div>
            <div className="item">식당 추천 받기</div>
            <div className="item">마이페이지</div>
          </div>
          <div className="mobile-header">
            <div className="mobile-logo">Food war</div>
            <div className="mobile-menu" onClick={this.menuToggle}>
              menu
            </div>
          </div>
        </div>
      </>
    );
  }
}
