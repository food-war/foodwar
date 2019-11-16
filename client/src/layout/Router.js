import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Auth, FindFood } from '../pages';
import './Route.scss';

import Sidebar from './Sidebar';

class Router extends Component {
  render() {
    return (
      <>
        {localStorage.token ? (
          <div className="Route">
            <Sidebar />
            <Route exact path="/find-food" component={FindFood} />
          </div>
        ) : (
          <Route exact path="/" component={Auth} />
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
