import * as actionTypes from "./actionTypes.js";
import axios from "axios";

import { push } from "connected-react-router";

//TODO: build a seperate signup page, and push different link after signup

export const signUp_ = res => {
    return {
        type: actionTypes.SIGN_UP,
        username: res.data.username,
        password: res.data.password
    };
};

export const signUp = user => {
    return dispatch => {
        return axios
            .post("/api/signup/", user)
            .then(res => {
                dispatch(signUp_(res));
                if (res.status == 201) {
                    alert("Sign up successful!");
                    dispatch(push("/login/"));
                }
            })
            .catch(err => {
                if (err.status != 201) {
                    alert("Username already taken!");
                }
            });
    };
};

export const signIn_ = res => {
    return {
        type: actionTypes.AUTHENTICATED,
        //userid: res.data.id,
        auth: true,
    };
};

export const signIn = user => {
    return dispatch => {
        return axios
            .post("/api/signin/", user)
            .then(res => {
                dispatch(signIn_(res));
                dispatch(push("/questions/create/"));
            })
            .catch(err => {
                alert(
                    "The username of password is incorrect.\nPlease try again."
                );
            });
    };
};

export const isLoggedIn_ = res => {
  return {
    type: actionTypes.AUTHENTICATED,
    auth: res,
  }
}

export const isLoggedIn = () => {
  return (dispatch) => {
    return axios
      .get("/api/is-authed/")
      .then(res => {
        //return true;
        dispatch(isLoggedIn_(true));
      })
      .catch(err => {
        //console.log("HERE");
        dispatch(isLoggedIn_(false));
      })
  }
}
