import React, { Component } from "react";
import { withRouter } from "react-router";
import PushNotification from "../../components/PushNotification/PushNotification";

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

    clickLocationHandler = (val) => {
        var watchID = null;
        if (val) {
            watchID = navigator.geolocation.watchPosition(position => {
                const { latitude, longitude } = position.coords;
            });
            this.setState({...this.state, location_subscribe: true});
        } else {
            watchID = navigator.geolocation.clearWatch(watchID)
            this.setState({...this.state, location_subscribe: false});
        }
    };

    render() {
        var subscribe_to_location = null;
        if (this.state.location_subscribe == false) {
            subscribe_to_location
            = <button
            id="location-toggle"
            onClick={() => {
                this.clickLocationHandler(true);
            }}
        >
            Subscribe
              </button>
        } else {
            subscribe_to_location
            = <button
            id="location-toggle"
            onClick={() => {
                this.clickLocationHandler(false);
            }}
        >
            UnSubscribe
              </button>
        }

        return (
            <div className="Settings">
                <div>
                    <PushNotification
                    push_subscribe={this.state.push_subscribe}/>
                </div>
                <div>
                    <label>
                        User Location
                        {subscribe_to_location}
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
