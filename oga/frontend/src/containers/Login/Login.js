import React, { Component } from "react";

//Material design imports
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import HOC from "./HOC";

class Login extends Component {
    clickSignUpHandler() {
        this.props.history.push("/signup");
    }

    render() {
        return (
            <div className="Login">
                <HOC
                    pageTitle="Login"
                    signupPage={false}
                    imgsrc="https://media.giphy.com/media/kDNzcJ5HTJjk1YmRDa/giphy.gif"
                />
                <Container maxWidth="xs">
                    <Button
                        id="signup-button"
                        fullWidth
                        color="primary"
                        onClick={() => this.clickSignUpHandler()}
                    >
                        Sign Up
                    </Button>
                </Container>
            </div>
        );
    }
}

export default Login;
