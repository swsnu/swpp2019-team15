import * as actionTypes from "./actionTypes.js";
import axios from "axios";

export const setTargetLocation = target => {
    return dispatch => {
        return dispatch(setTargetLocation_(target));
    };
};

export const setCurrentCoordinates_ = coordinates => {
    return {
        type: actionTypes.SET_CURRENT_COORDINATES,
        //name: "test",
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    };
};

export const setTargetLocation = (target) => {
  return (dispatch) => {
    return dispatch(setTargetLocation_(target));
  }
}

export const setCurrentCoordinates_ = (coordinates) => {
  return {
    type: actionTypes.SET_CURRENT_COORDINATES,
    //name: "test",
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  }
}

export const setCurrentCoordinates = (coordinates) => {
  return (dispatch) => {
    return axios.post('/api/location/', coordinates)
      .then(res => {
        dispatch(setCurrentCoordinates_(coordinates));
      }).catch(res => -1);
  }
}