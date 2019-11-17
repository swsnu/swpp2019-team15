import React, { Component } from "react";

//Material design imports
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
            </div>
        );
    }
}

export default Login;
