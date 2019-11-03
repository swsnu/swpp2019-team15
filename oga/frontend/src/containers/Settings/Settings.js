import React, { useState, Component } from "react";
import { withRouter } from "react-router";
import PushNotification from "../../components/PushNotification/PushNotification";

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

    render() {
        return (
            <div>
                <div>
                    <PushNotification />
                </div>
                <div>
                    <label>
                        User Location
                        <button
                            id="location-toggle"
                            onClick={() => {
                                this.clickLocationHandler();
                            }}
                        >
                            Subscribe
                        </button>
                    </label>
                </div>
                <div>
                    <button
                        id="back-button"
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
