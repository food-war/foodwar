import React, { Component } from 'react';
import axios from 'axios';

import { REACT_APP_LOCAL_URL, REACT_APP_BACKEND_API_URL } from '../config/env';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        // axios
        //     .post('/api/user/register', newUser)//어디로 무엇을 보낼지
        //     .then(res => console.log(res.data))//성공
        //     .catch(err => this.setState({errors: err.response.data}))//실패
            
        const nowURL = window.location.href;

        let request_url;

        if (nowURL.indexOf('localhost') !== -1) {
        request_url = REACT_APP_LOCAL_URL;
        } else {
        request_url = REACT_APP_BACKEND_API_URL;
        }
        //서버랑 axios 통신하기
        axios.post(`${request_url}/api/user/register`, newUser)
             .then(res => {
                const dataFromServer = res.data;
                this.setState({ data: dataFromServer });
            });
            console.log(newUser);
        }
    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        required
                                    />
                                    <small className="form-text text-muted">
                                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="reqeat password"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" value="sign up"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;