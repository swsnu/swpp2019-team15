import React, { Component } from "react";

//Material UI imports
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";

import HOC from "./HOC";

class Signup extends Component {
    clickLoginHandler() {
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="Signup">
                <HOC
                    pageTitle="Sign up"
                    signupPage={true}
                    imgsrc="https://media1.giphy.com/media/xFoV7P0JsHwoZvHXP6/source.gif"
                />
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
            </div>
        );
    }
}

export default Signup;
