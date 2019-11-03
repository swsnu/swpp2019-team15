import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/index";

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notificationSetting: "OFF",
            locationSetting: "OFF"
        };
    }

    clickLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
        });
    };

    clickNotificationHandler = () => {
        // this.setState(() => {
        //     notificationSetting: notificationSetting == "ON" ? "OFF" : "ON";
        // });
    };

    render() {
        return (
            <div>
                <div>
                    <label>Push Notifications</label>
                    <button
                        id="notification-toggle"
                        onClick={() => this.clickNotificationHandler()}
                    >
                        Subscribe
                    </button>
                </div>
                <div>
                    <label>User Location</label>
                    <button
                        id="location-toggle"
                        onClick={() => {
                            this.clickLocationHandler();
                        }}
                    >
                        Subscribe
                    </button>
                </div>
                <div>
                    <button
                        id="location-toggle"
                        onClick={() => {
                            this.props.history.goBack();
                        }}
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(Settings);
