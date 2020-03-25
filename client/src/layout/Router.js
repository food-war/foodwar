import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Auth, Store, Login } from '../pages';
import './Route.scss';

import Sidebar from './Sidebar';

class Router extends Component {
  render() {
    return (
      <>
        {localStorage.token ? (
          <div className="Route">
            <Sidebar />
            <Route exact path ="/" component={Store} />
            <Route path="/store" component={Store} />
            <Route path ="/login" component={Store} />
            <Route path ="/register" component={Store} />
          </div>
        ) : (
          <>
            <Route exact path="/" component={Auth} />
            <Route path="/login" component={Auth}/>
            <Route path="/register" component={Auth} />
            
            {/* 토큰 없이 스토어에 접근했을 경우 */}
            <Route path="/store" component={Auth} />
          </>
        )}

        {/* <Header />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> */}
      </>
    );
  }
}

export default Router;
