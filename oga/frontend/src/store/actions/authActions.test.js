import axios from "axios";

import * as actionCreators from "./authActions";
import store from "../store.js";

const alert = jest.spyOn(window, "alert").mockImplementation(() => {});
console.log = jest.fn();

describe("authActions", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test authorization for sign in actions
    it(`'signIn' should signIn correctly`, done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 201,
                    data: { id: 3 }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.signIn()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`should handle error in 'signIn' `, done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 201,
                    data: { id: 3 }
                };
                reject(result);
            });
        });

        store.dispatch(actionCreators.signIn()).then(() => {
            expect(alert).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test authorization for sign up actions
    it(`'signup' should signup correctly`, done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 201,
                    data: { id: 3 }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.signUp()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            expect(alert).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'signup' with wrong state should not show success message `, done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 3 }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.signUp()).then(() => {
            expect(alert).toHaveBeenCalledTimes(0);
            done();
        });
    });

    it(`should catch 'signup' error `, done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 401,
                    data: { id: 3 }
                };
                reject(result);
            });
        });
        store.dispatch(actionCreators.signUp()).then(() => {
            expect(alert).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`should catch 'signup' error `, done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 201,
                    data: { id: 3 }
                };
                reject(result);
            });
        });
        store.dispatch(actionCreators.signUp()).then(() => {
            expect(alert).toHaveBeenCalledTimes(0);
            done();
        });
    });

    // Tests for login authorization status
    it(`should call 'isLoggedIn' `, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 201,
                    data: { id: 3 }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.isLoggedIn()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`should handle error 'isLoggedIn' `, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 201,
                    data: { id: 3 }
                };
                reject(result);
            });
        });

        store.dispatch(actionCreators.isLoggedIn()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test logout actions
    it(`'Logout' should logout user correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 204
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.Logout()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`should handle error in 'Logout' `, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 204
                };
                reject(result);
            });
        });

        store.dispatch(actionCreators.Logout()).then(() => {
            expect(console.log).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test Profile actions for currently logged in user
    it(`should handle 'getProfile' `, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 201,
                    data: { id: 3 }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.getProfile()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`should handle error in 'getProfile' `, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 201,
                    data: { id: 3 }
                };
                reject(result);
            });
        });

        store.dispatch(actionCreators.getProfile()).then(() => {
            expect(console.log).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test Profile actions for getting profile of another user
    it(`should handle 'getUserProfile' `, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 201,
                    data: { username: "test" }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.getUserProfile("test")).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`should handle error in 'getProfile' `, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 201,
                    data: { username: "invalidUser" }
                };
                reject(result);
            });
        });

        store
            .dispatch(actionCreators.getUserProfile("invalidUser"))
            .then(() => {
                expect(console.log).toHaveBeenCalledTimes(1);
                done();
            });
    });
});
