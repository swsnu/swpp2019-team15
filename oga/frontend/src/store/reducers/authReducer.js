import * as actionTypes from '../actions/actionTypes';

const initialState = {
  authenticated: null,
  //userid: null,
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
      //const userid = action.userid;
      return { ...state, authenticated: action.authenticated};
    case actionTypes.UNAUTHENTICATED:
      console.log(action);
      return {...state, authenticated: false};
    default:
      break;
  }
  return state;
}

export default authReducer;
