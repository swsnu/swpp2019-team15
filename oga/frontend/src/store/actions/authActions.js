import * as actionTypes from './actionTypes.js';
import axios from 'axios';

import { push } from 'connected-react-router';

axios.defaults.xsrfCookieName="csrftoken";
axios.defaults.xsrfHeaderName="X-CSRFTOKEN";

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

export const signIn_ = (res) => {
  return {
    type: actionTypes.AUTHENTICATED,
    userid: res.data.id,
  }
}

export const signIn = (user) => {
  return (dispatch) => {
    return axios.post('/api/signin/', user)
      .then(res => {
        dispatch(signIn_(res));
        dispatch(push('/questions/create/'));
      })
  }
}
