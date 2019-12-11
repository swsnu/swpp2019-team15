import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/index";

//Material design imports
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class Login extends Component {
    state = {
        username: "",
        password: ""
    };

    clickSignUpHandler() {
        this.props.history.push("/signup");
    }

    clickSignInHandler() {
        this.props.signin(this.state.username, this.state.password);
    }

    render() {
        return (
            /**
             * Prevent user from accessing
             * login page if already signed in
             */
            <div
                className="Login"
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                }}
            >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <img
                        src="https://media.giphy.com/media/kDNzcJ5HTJjk1YmRDa/giphy.gif"
                        width="35%"
                    />
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username-input"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={this.state.username}
                        onChange={event =>
                            this.setState({
                                username: event.target.value
                            })
                        }
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="pw-input"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        value={this.state.password}
                        onChange={event =>
                            this.setState({
                                password: event.target.value
                            })
                        }
                    />
                    <Button
                        id="login-button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => this.clickSignInHandler()}
                    >
                        Login
                    </Button>
                    <Grid container justify="center" alignItems="center">
                        <Button
                            id="signup-button"
                            fullWidth
                            color="primary"
                            onClick={() => this.clickSignUpHandler()}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signin: (username, password) =>
            dispatch(
                actionCreators.signIn({
                    username: username,
                    password: password
                })
            )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
