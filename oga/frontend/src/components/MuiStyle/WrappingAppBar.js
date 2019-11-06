import React, { Component } from "react";
import { withRouter } from "react-router";
import AppBar from "./AppBar";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";

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

    render () {

            return (
                <AppBar auth={this.props.log_status} func={this.props.logout}>

                </AppBar>
            )
    }
}

const mapStateToProps = state => {
    return {
        log_status: state.auth.authenticated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => 
            dispatch(actionCreators.Logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappingAppBar);
