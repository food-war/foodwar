import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { Home, Login, Register } from '../pages';
import Header from './Header';
import './Header.scss';

class Router extends Component {
    render() {
        return (
            <div>
                <Header/>               
                <Route exact path='/' component={Home} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
        
            </div>
        );
    }
}

export default Router;