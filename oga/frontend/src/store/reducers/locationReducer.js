import * as actionTypes from '../actions/actionTypes';

const initialState = {
  name: null,
  //location_id: null,
  targetLocation: null,
  currentCoordinates: null,
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TARGET_LOCATION:
      const target = {
        name: action.name,
        latitude: action.latitude,
        longitdue: action.longitude,
      }
      return {...state, targetLocation: target};
    case actionTypes.SET_CURRENT_COORDINATES:
      const coordinates = {
        latitude: action.latitude,
        longitude: action.longitude,
      }
      return {...state, currentCoordinates: coordinates};
    default:
      break;
  }
  return state;
}

export default locationReducer;
