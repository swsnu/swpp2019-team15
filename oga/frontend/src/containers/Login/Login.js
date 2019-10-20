import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../../store/actions/index';

class Login extends Component {

  state = {
    username: '',
    password: '',
    //logged_in: true,
    //logIn_try: false,
  }


  clickSignUpHandler(){
    //this.props.logIn_try = true;
    this.props.signUp(this.state.username, this.state.password);
  } 

  clickSignInHandler(){
    //this.props.logIn_try = true;
    this.props.signIn(this.state.username, this.state.password);
  } 

  render() {
    let redirect = null;
    if (this.state.logged_in)
    {
      redirect = <Redirect to="./main/questions"></Redirect>
    } else {
      if (this.state.logIn_try) {
        alert("username or password is wrong");
      }
    }

    return (
      <div className="Login">
        {redirect}
        <h1>Login</h1>
        <label>Username</label>
        <input type="text"
          id="username-input"
          value={this.state.username}
          onChange={(event) => this.setState({ username: event.target.value})}
        ></input>
        <label>Password</label>
        <input 
          type="text"
          id="pw-input"
          value={this.state.password}
          onChange={(event) => this.setState({ password: event.target.value})}
        ></input>
        <button
          id="login-button"
          onClick={() => this.clickSignInHandler()}>Login</button>
        <button
          id="signup-button"
          onClick={() => this.clickSignUpHandler()}>Sign Up</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (username, password) => 
    dispatch(actionCreators.signUp({username: username, password: password})),
    signIn: (username, password) => 
    dispatch(actionCreators.signIn({username: username, password: password})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);