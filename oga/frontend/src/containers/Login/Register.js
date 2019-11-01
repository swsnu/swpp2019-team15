import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { push } from "connected-react-router";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as actionCreators from "../../store/actions/index";

class Register extends Component {
    state = {
        username: "",
        password: "",
        confirmPassword: ""
    };

    clickSignUpHandler() {
        //validation check
        if (this.state.username == "") {
            alert("Please enter username");
        } else if (this.state.password == "") {
            alert("Please enter password");
        } else if (this.state.password == this.state.confirmPassword) {
            // passwords match, sign up successful
            this.props.signup(this.state.username, this.state.password);
        } else {
            alert("Password does not match!");
        }
    }
    clickLoginHandler() {
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="Register">
                <h1>Sign up</h1>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        id="username-input"
                        value={this.state.username}
                        onChange={event =>
                            this.setState({ username: event.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="text"
                        id="pw-input"
                        value={this.state.password}
                        onChange={event =>
                            this.setState({ password: event.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="text"
                        id="confirm-pw-input"
                        value={this.state.confirmPassword}
                        onChange={event =>
                            this.setState({
                                confirmPassword: event.target.value
                            })
                        }
                    />
                </div>
                <button
                    id="login-button"
                    onClick={() => this.clickLoginHandler()}
                >
                    Login
                </button>
                <button
                    id="signup-button"
                    onClick={() => this.clickSignUpHandler()}
                >
                    Sign Up
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (username, password) =>
            dispatch(
                actionCreators.signUp({
                    username: username,
                    password: password
                })
            )
    };
};

export default connect(
    // mapStateToProps,
    null,
    mapDispatchToProps
)(Register);
