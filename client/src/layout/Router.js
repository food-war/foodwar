import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Auth, Store } from '../pages';
import './Route.scss';

import Sidebar from './Sidebar';

class Router extends Component {
  render() {
    return (
      <>
        {localStorage.token ? (
          <div className="Route">
            <Sidebar />
            <Route exact path="/store" component={Store} />
          </div>
        ) : (
          <>
            <Route exact path="/" component={Auth} />
            <Route path="/register" component={Auth} />
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
