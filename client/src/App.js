import React, { Component } from 'react';
import { REACT_APP_LOCAL_URL, REACT_APP_BACKEND_API_URL } from './config/env';
import axios from 'axios';
//import Login from "./components/Login";
//import Register from "./components/Register";
import {Login, Register} from './pages';

import {Route} from 'react-router-dom';


class App extends Component {
  state = {
    data: ''
  };
  componentDidMount = () => {
    const nowURL = window.location.href;

    let request_url;

    if (nowURL.indexOf('localhost') !== -1) {
      request_url = REACT_APP_LOCAL_URL;
    } else {
      request_url = REACT_APP_BACKEND_API_URL;
    }
    //서버랑 axios 통신하기
    axios.get(`${request_url}/sayHello`).then(res => {
      const dataFromServer = res.data;
      this.setState({ data: dataFromServer });
    });
    
  };
  render() {
    return (
      
      <div className='App'>
        <header className='App-header'>
          <p>Server is saying:</p>
          <p>{this.state.data}</p>
        </header>
        <div>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </div>
      </div>
    );
  }
}

export default App;