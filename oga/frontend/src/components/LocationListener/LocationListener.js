/**
 * Summary.
 * Location Listener
 * 
 *
 * Description.
 * This component can be attached to any other components in order to listen to
 * user's location change.
 * Use browser's watchPosition to update current coordinates upon change.
 * The new coordinates will be updated(to the store and server)
 * only when the distance between the coordinates are above a certain
 * threshold (30m). 
 * This allows users to save power, and imposes less stress on servers.
 *
 * We can also introduce an upper bound to distance, which can be used to thwart
 * malicious users, who are moving at inhumane speed. Currently disabled for
 * testing purposes.
 * 
 * @author taehioum
 * @since  2019-10-19
 */

import React, { Component } from 'react';
import haversine from 'haversine'
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';

const options = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

class LocationListener extends Component {
  constructor(props) {
    super(props);

    //update the coordinates when the moved distance is above this threshold.
    this.THRESHOLD = 30;

    this.state = {
      latitude: 0,
      longitude: 0,
      //unused, but might be useful
      //routeCoordinates: [],
      //unused, but might be useful
      //totalDistanceMoved: 0,
      previousCoordinates: null,
    };
  }


  //returns meter distance between two coordinates
  //returns 0 if prevCoordinates is empty
  distance = (prevCoordinates, newCoordinates) => {
    //use haversine due to the curviness of the earth
    return haversine(prevCoordinates, newCoordinates, {unit: 'meter'}) || 0;
  };

  setPosition = (position) => {
    //const { routeCoordinates, totalDistanceMoved } = this.state;
    const { latitude, longitude } = position.coords;
    const {previousCoordinates} = this.state;
    const newCoordinates = {
      // this is left as a dummy string as of now.
      // to use reverse geocoding of googlemaps, we have to 
      // display the map(it's google's policy). 
      // And if we are to use map, defeats the purpose of a light weight
      // location tracker
      name: "userlocation",
      latitude,
      longitude
    };

    //if called the first time, update previousCoordinates no matter what
    if (previousCoordinates === null) {
      this.setState({latitude, longitude, previousCoordinates: newCoordinates});
      this.props.setCurrentCoordinates(newCoordinates);
      return;
    }

    const distance = this.distance(previousCoordinates, newCoordinates);
    if (distance > this.THRESHOLD) {
      this.setState({latitude, longitude, previousCoordinates: newCoordinates});
      this.props.setCurrentCoordinates(newCoordinates);
    }
  };

  handleError = (error) => {
    console.log(error);
  };

  componentDidMount() {
    //TODO: should introduce better error handling
    this.watchID = navigator.geolocation.watchPosition(
      this.setPosition, this.handleError, options);
  }

  render() {
    return (
      <div className="LocationListener">
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentCoordinates: (coordinates) => 
    dispatch(actionCreators.setCurrentCoordinates(coordinates)),
  }
}


export default connect(null, mapDispatchToProps) (LocationListener);
