import React from "react";

import reducer from "./authReducer";
import * as actionTypes from "../actions/actionTypes";

describe("Auth Reducer", () => {
    it("should return default state", () => {
        const newState = reducer(undefined, {}); // initialize
        expect(newState).toEqual({ authenticated: null });
    });

    it("should return authenticated upon signin", () => {
        const newState = reducer(undefined, {
            type: actionTypes.AUTHENTICATED,
            authenticated: true
            //userid: "test",
        });
        expect(newState).toEqual({
            authenticated: true
            //userid: "test",
        });
    });

    it("should return authenticated upon signup", () => {
        const newState = reducer(undefined, {
            type: actionTypes.SIGN_UP
        });
        expect(newState).toEqual({
            authenticated: null,
            profile: null
        });
    });

    it("should return authenticated=false upon UNAUTH", () => {
        const newState = reducer(undefined, {
            type: actionTypes.UNAUTHENTICATED
        });
        expect(newState).toEqual({
            authenticated: false
            //userid: null,
        });
    });
});
