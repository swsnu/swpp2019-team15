import * as actionTypes from './actionTypes.js';
import axios from 'axios';

import { push } from 'connected-react-router';

axios.defaults.xsrfCookieName="csrftoken";
axios.defaults.xsrfHeaderName="X-CSRFTOKEN";

export const signUp_ = (user) => {
  return {
    type: actionTypes.SIGN_UP,
    username: user.username,
    password: user.password,
  }
}

//TODO: build a seperate signup page, and push different link after signup
export const signUp = (user) => {
  return (dispatch) => {
    return axios.post('/api/signup/', user)
      .then(res => {
        //dispatch(signUp_(user));
        //dispatch(push('/main/questions/'));
      })
  }
}

export const signIn_ = () => {
  return {
    type: actionTypes.AUTHENTICATED,
    //username: user.username,
  }
}

export const signIn = (user) => {
  return (dispatch) => {
    return axios.post('/api/signin/', user)
      .then(res => {
        dispatch(signIn_());
        dispatch(push('/questions/create/'));
      })
  }
}
