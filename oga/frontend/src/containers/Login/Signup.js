import React, { Component } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

//Material UI imports
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import * as actionCreators from "../../store/actions/index";

class Signup extends Component {
    state = {
        username: "",
        password: "",
        confirmPassword: ""
    };

    clickSignUpHandler() {
        //validation check
        if (this.state.username === "") {
            alert("Please enter username");
        } else if (this.state.password === "") {
            alert("Please enter password");
        } else if (this.state.password === this.state.confirmPassword) {
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
            <div
                className="Signup"
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
                        src="https://media1.giphy.com/media/xFoV7P0JsHwoZvHXP6/source.gif"
                        width="30%"
                    />
                    <Typography component="h1" variant="h3" color="primary">
                        <b>askAT</b>
                    </Typography>
                    <Box pt={3} />
                    <Typography component="h2" variant="h5">
                        Sign up
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
                    <TextField
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="confirm-pw-input"
                        label="Confirm Password"
                        name="confirm-password"
                        autoComplete="confirm-password"
                        value={this.state.confirmPassword}
                        onChange={event =>
                            this.setState({
                                confirmPassword: event.target.value
                            })
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        id="signup-button"
                        onClick={() => this.clickSignUpHandler()}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center" alignItems="center">
                        <Button
                            id="login-button"
                            fullWidth
                            color="primary"
                            onClick={() => this.clickLoginHandler()}
                        >
                            Already have an account? Login
                        </Button>
                    </Grid>
                </Container>
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
)(Signup);
