import axios from "axios";

import * as actionCreators from "./questionActions";
import store from "../store.js";

console.log = jest.fn();
console.error = jest.fn();
window.alert = jest.fn();
describe("questionActions", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test creating a new question
    it(`'createQuestion' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                resolve(result);
            });
        });
        const question = {
            author_id: 1,
            content: "hello?",
            target_location: {
                name: "home",
                longitude: 123,
                latitude: 123
            }
        };

        store.dispatch(actionCreators.createQuestion(question)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'createQuestion' should be handle error`, done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                reject(result);
            });
        });
        const question = {
            author_id: 1,
            content: "hello?",
            target_location: {
                name: "home",
                longitude: 123,
                latitude: 123
            }
        };

        store.dispatch(actionCreators.createQuestion(question)).then(() => {
            expect(console.log).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test getting a question with given id
    it(`'getQuestion' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.getQuestion(1)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getQuestion' should handle error correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                reject(result);
            });
        });
        const question = {
            author_id: 1,
            content: "hello?",
            target_location: {
                name: "home",
                longitude: 123,
                latitude: 123
            }
        };

        store.dispatch(actionCreators.getQuestion(question)).then(() => {
            expect(console.log).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test getting list of all questions
    it(`'getQuestions' should handle error`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                reject(result);
            });
        });
        store.dispatch(actionCreators.getQuestions()).then(() => {
            expect(console.log).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getQuestions' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                resolve(result);
            });
        });
        store.dispatch(actionCreators.getQuestions()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test getting question list of currently logged in user
    it(`'getUserQuestions' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200
                };
                resolve(result);
            });
        });
        store.dispatch(actionCreators.getUserQuestions()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test getting question list of a specific user
    it(`'getUserQuestions' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { username: "test" }
                };
                resolve(result);
            });
        });
        store.dispatch(actionCreators.getUserQuestions("test")).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getUserQuestions' should handle errors correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200
                };
                reject(result);
            });
        });
        store.dispatch(actionCreators.getUserQuestions()).then(() => {
            expect(console.log).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test subscribing to a question
    it(`'followQuestion' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                resolve(result);
            });
        });
        store.dispatch(actionCreators.followQuestion(1)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'followQuestion' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                resolve(result);
            });
        });
        store.dispatch(actionCreators.followQuestion(1)).then(() => {
            expect(alert).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'followQuestion' should handle error `, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                reject(result);
            });
        });
        store.dispatch(actionCreators.followQuestion(1)).then(() => {
            expect(alert).toHaveBeenCalledTimes(1);
            done();
        });
    });
});
