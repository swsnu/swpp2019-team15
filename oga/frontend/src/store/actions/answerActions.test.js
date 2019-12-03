import axios from "axios";

import * as actionCreators from "./answerActions.js";
import store from "../store.js";

console.error = jest.fn();

describe("answerActions", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test creating a new answer for given question
    it(`'createAnswer' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                resolve(result);
            });
        });
        const answer = {
            question_id: 1,
            author_id: 1,
            content: "hello?",
            question_type: "RAIN",
            content: "NO"
        };

        store.dispatch(actionCreators.createAnswer(answer)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'createAnswer' should be handle error `, done => {
        const spy = jest.spyOn(axios, "post").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                reject(result);
            });
        });
        const answer = {
            question_id: 1,
            author_id: 1,
            content: "hello?",
            question_type: "RAIN",
            content: "NO"
        };

        store.dispatch(actionCreators.createAnswer(answer)).then(() => {
            expect(console.error).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test get all answers of question with given id
    it(`'getAnswers' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.getAnswers(1)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getAnswers' should handle error correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                reject(result);
            });
        });

        store.dispatch(actionCreators.getAnswers(1)).then(() => {
            expect(console.error).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test get answers for profile of currently logged in user
    it(`'getUserAnswers' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.getUserAnswers()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getUserAnswers' should handle error correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200
                };
                reject(result);
            });
        });

        store.dispatch(actionCreators.getUserAnswers()).then(() => {
            expect(console.error).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test getting profile answer list of given user
    it(`'getSingleUserAnswers' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { username: "test" }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.getSingleUserAnswers("test")).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getSingleUserAnswers' should handle error correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { username: "test" }
                };
                reject(result);
            });
        });

        store.dispatch(actionCreators.getSingleUserAnswers("test")).then(() => {
            expect(console.error).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test getting answer with given id
    it(`'getAnswer' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.getAnswer(1)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getAnswer' should handle error correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                reject(result);
            });
        });

        store.dispatch(actionCreators.getAnswer(1)).then(() => {
            expect(console.error).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test checking if answer is rated
    it(`'checkRating' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.checkRating(1)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'checkRating' should handle error correctly`, done => {
        const spy = jest.spyOn(axios, "get").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                reject(result);
            });
        });

        store.dispatch(actionCreators.checkRating(1)).then(() => {
            expect(console.error).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test upvoting an answer
    it(`'rateUp' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "put").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.rateUp(1)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'rateUp' should handle error correctly`, done => {
        const spy = jest.spyOn(axios, "put").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                reject(result);
            });
        });

        store.dispatch(actionCreators.rateUp(1)).then(() => {
            expect(console.error).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // Test downvoting an answer
    it(`'checkRating' should be called correctly`, done => {
        const spy = jest.spyOn(axios, "put").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                resolve(result);
            });
        });

        store.dispatch(actionCreators.rateDown(1)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'checkRating' should handle error correctly`, done => {
        const spy = jest.spyOn(axios, "put").mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: { id: 1 }
                };
                reject(result);
            });
        });

        store.dispatch(actionCreators.rateDown(1)).then(() => {
            expect(console.error).toHaveBeenCalledTimes(1);
            done();
        });
    });
});
