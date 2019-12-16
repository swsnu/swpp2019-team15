import * as actionTypes from '../actions/actionTypes';

const initialState = {
  name: null,
  //location_id: null,
  targetLocation: null,
  currentCoordinates: null,
}

const locationReducer = (action, state = initialState) => {
  switch (action.type) {
    case actionTypes.SET_TARGET_LOCATION:
      const target = {
        name: action.name,
        latitude: action.latitude,
        longitude: action.longitude,
        place_type: action.place_type,
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
