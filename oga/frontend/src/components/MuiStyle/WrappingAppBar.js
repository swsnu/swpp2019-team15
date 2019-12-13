import React, { Component } from "react";
import AppBar from "./AppBar";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actionTypes";

class WrappingAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location_subscribe: false
        };
    }

    // clickLocationHandler = (val) => {
    //     var watchID = null;
    //     if (val) {
    //         watchID = navigator.geolocation.watchPosition(position => {
    //             const { latitude, longitude } = position.coords;
    //         });
    //         this.setState({...this.state, location_subscribe: true});
    //     } else {
    //         watchID = navigator.geolocation.clearWatch(watchID)
    //         this.setState({...this.state, location_subscribe: false});
    //     }
    // };

    render() {
        var log_toggle
        if (this.props.log_status) {
            log_toggle = this.props.logout
        } else {
            log_toggle = this.props.login
        }
        return (
            <AppBar
                position="static"
                auth={this.props.log_status}
                func={log_toggle}
            ></AppBar>
        );
    }
}

const mapStateToProps = state => {
    return {
        log_status: state.auth.authenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(actionCreators.Login()),
        logout: () => dispatch(actionCreators.Logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappingAppBar);
