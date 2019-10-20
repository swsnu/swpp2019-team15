import * as actionTypes from './actionTypes.js';
import axios from 'axios';

import { push } from 'connected-react-router';


export const setTargetLocation_ = (target) => {
  return {
    type: actionTypes.SET_TARGET_LOCATION,
    name: target.name,
    latitude: target.geometry.location.lat(),
    longitude: target.geometry.location.lng(),
  }
}

export const setTargetLocation = (target) => {
  return (dispatch) => {
    return dispatch(setTargetLocation_(target));
  }
}

export const setCurrentCoordinates_ = (coordinates) => {
  return {
    type: actionTypes.SET_CURRENT_COORDINATES,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  }
}

export const setCurrentCoordinates = (coordinates) => {
  return (dispatch) => {
    return dispatch(setCurrentCoordinates_(coordinates));
  }
}