import React, { Component } from 'react';
import { REACT_APP_LOCAL_URL, REACT_APP_BACKEND_API_URL } from './config/env';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

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

    axios.get(`${request_url}/sayHello`).then(res => {
      const dataFromServer = res.data;
      this.setState({ data: dataFromServer });
    });
  };
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>Server is saying:</p>
          <p>{this.state.data}</p>
        </header>
      </div>
    );
  }
}

export default App;