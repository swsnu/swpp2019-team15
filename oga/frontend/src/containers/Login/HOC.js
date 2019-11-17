import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

//Material design imports
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

class HOC extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirmPassword: ""
        };
    }

    onChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onSubmitHandler() {
        {
            this.props.signupPage
                ? this.validateSignup()
                : this.props.signin(this.state.username, this.state.password);
        }
    }

    validateSignup() {
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

    render() {
        return (
            <div className={this.props.pageTitle}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box pt={5} />
                    <img
                        src="https://media.giphy.com/media/kDNzcJ5HTJjk1YmRDa/giphy.gif"
                        width="35%"
                    />
                    <Typography component="h1" variant="h3" color="primary">
                        <b>askAT</b>
                    </Typography>
                    <Box pt={5} />
                    <Typography component="h1" variant="h5">
                        {this.props.pageTitle}
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
                        onChange={this.onChangeHandler}
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
                        onChange={this.onChangeHandler}
                    />
                    {this.props.signupPage && (
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
                    )}
                    <Button
                        id="submit-button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => this.onSubmitHandler()}
                    >
                        {this.props.pageTitle}
                    </Button>
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
            ),
        signup: (username, password) =>
            dispatch(
                actionCreators.signUp({
                    username: username,
                    password: password
                })
            )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HOC);
