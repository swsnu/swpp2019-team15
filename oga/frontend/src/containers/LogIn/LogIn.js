import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../../store/actions/index';

class LogIn extends Component {

  state = {
    email: '',
    password: '',
    logged_in: true,
    logIn_try: false,
  }

  postLogInHandler(){
    this.props.logIn_try = true;
    this.props.setLog(this.state.email, this.state.password);
  } 

  render() {
    let redirect = null;
    if (this.state.logged_in)
    {
      redirect = <Redirect to="./main/questions"></Redirect>
    } else {
      if (this.state.logIn_try) {
        alert("Email or password is wrong");
      }
    }

    return (
      <div className="LogIn">
        {redirect}
        <h1>LogIn</h1>
        <label>E-mail</label>
        <input
          type="text"
          id="email-input"
          value={this.state.email}
          onChange={(event) => this.setState({ email: event.target.value})}
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
          onClick={() => this.postLogInHandler()}>Log-in</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    //log_status: state.rd.log_status,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    //setLog: (email, password) => 
    //dispatch(actionCreators.settingLogged(email, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
