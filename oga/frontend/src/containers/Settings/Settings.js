import React, { Component } from "react";
import { withRouter } from "react-router";
import PushNotification from "../../components/PushNotification/PushNotification";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";

//Material UI imports
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location_subscribe: false,
            push_subscribe: false,
            notificationSetting: "OFF",
            locationSetting: "OFF"
        };
    }

    clickLocationHandler = val => {
        var watchID = null;
        if (val) {
            watchID = navigator.geolocation.watchPosition();
            // position => { const { latitude, longitude } = position.coords;});
            this.setState({ ...this.state, location_subscribe: true });
        } else {
            watchID = navigator.geolocation.clearWatch(watchID);
            this.setState({ ...this.state, location_subscribe: false });
        }
    };

    render() {
        var subscribe_to_location = null;
        if (!this.state.location_subscribe) {
            subscribe_to_location = (
                <Button
                    id="location-toggle"
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        this.clickLocationHandler(true);
                    }}
                >
                    Subscribe
                </Button>
            );
        } else {
            subscribe_to_location = (
                <Button
                    id="location-toggle"
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        this.clickLocationHandler(false);
                    }}
                >
                    Unsubscribe
                </Button>
            );
        }

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="Settings">
                    <Box pt={10} />
                    <Typography component="h1" variant="h3">
                        Settings
                    </Typography>
                    <Box pt={5} />
                    <Grid container justify="center" alignItems="center">
                        <PushNotification />
                    </Grid>
                    <Box pt={5} />
                    <Typography component="h4" variant="h5">
                        User Location
                    </Typography>
                    <Box />
                    {subscribe_to_location}
                    <Box pt={10} />
                </div>
            </Container>
        );
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         logout: () => dispatch(actionCreators.Logout())
//     };
// };

export default withRouter(Settings);
