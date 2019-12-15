import React from "react";
import * as actionTypes from "./actionTypes.js";
import axios from "axios";
import { push } from "connected-react-router";

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
                if (res.status === 201) {
                    alert("Sign up successful!");
                    dispatch(push("/login/"));
                }
            })
            .catch(err => {
                if (err.status !== 201) {
                    alert("Username already taken!");
                }
            });
    };
};

export const signIn_ = res => {
    return {
        type: actionTypes.AUTHENTICATED,
        //userid: res.data.id,
        authenticated: true
    };
};

export const signIn = user => {
    return dispatch => {
        return axios
            .post("/api/signin/", user)
            .then(res => {
                dispatch(signIn_(res));
                dispatch(push("/main"));
            })
            .catch(err => {
                alert(
                    "The username or password is incorrect.\nPlease try again."
                );
            });
    };
};

export const isLoggedIn_ = res => {
    return {
        type: actionTypes.AUTHENTICATED,
        authenticated: res
    };
};

export const isLoggedIn = () => {
    return dispatch => {
        return axios
            .get("/api/is-authed/")
            .then(res => {
                dispatch(isLoggedIn_(true));
            })
            .catch(err => {
                console.log(err);
                dispatch(isLoggedIn_(false));
            });
    };
};

export const Logout = () => {
    return dispatch => {
        return axios
            .get("/api/un-authed/")
            .then(res => {
                dispatch(isLoggedIn_(false));
                dispatch(push("/login"));
            })
            .catch(err => {
                console.log(err);
                dispatch(isLoggedIn_(true));
            });
    };
};

export const getProfile_ = profile => {
    return {
        type: actionTypes.GET_PROFILE,
        id: profile.id,
        username: profile.username,
        location: profile.location,
        coordinates: profile.coordinates,
        todayAnswerCount: profile.todayAnswerCount,
        todayQuestionCount: profile.todayQuestionCount,
        reliability: profile.reliability,
        rankNum: profile.rankNum,
    };
};

export const getProfile = (username = "") => {
    return dispatch => {
        return axios
            .get("/api/profile/" + username)
            .then(res => dispatch(getProfile_(res.data)))
            .catch(err => console.log(err));
    };
};