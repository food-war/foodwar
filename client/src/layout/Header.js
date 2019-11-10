import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <div className='header'>
                Foodwar
                <div className='topnav'>
                    <ul>
                        <li><Link to="/Login">Login</Link></li>
                        <li><Link to="/Register">Register</Link></li>
                    </ul>
                </div>
            </div>            
        );
    }
}

export default Header;