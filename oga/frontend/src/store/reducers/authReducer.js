import * as actionTypes from '../actions/actionTypes';

const initialState = {
  authenticated: false,
  //selectedQuestion: null,
  //user_name: null,
  //targetLocation: null,
  //questions: []
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP: //nothing to do, really or show some success message?
      return {...state};
    case actionTypes.AUTHENTICATED:
      return { ...state, authenticated: true};
    case actionTypes.UNAUTHENTICATED:
      return {...state, authenticated: false};
    default:
      break;
  }
  return state;
}

export default authReducer;
