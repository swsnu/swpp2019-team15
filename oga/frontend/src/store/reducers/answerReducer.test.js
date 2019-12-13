import reducer from "./answerReducer.js";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    answer: null,
    answers: [],
    answer_id: null,
    is_rated: null,
    rated_up: null,
    rated_down: null
};

describe("Answer Reducer", () => {
    it("should return default state", () => {
        const newState = reducer(undefined, {}); // initialize
        expect(newState).toEqual(initialState);
    });

    // Test create new answer
    it("should return new answer upon create", () => {
        const newState = reducer(undefined, {
            type: actionTypes.CREATE_ANSWER,
            question_id: 1,
            author_id: 2,
            question_type: "RAIN",
            answer_content: 3
        });
        expect(newState).toEqual({
            ...initialState,
            answer: {
                question_id: 1,
                author_id: 2,
                question_type: "RAIN",
                answer_content: 3
            }
        });
    });

    // Test getting the answer list of a user's profile
    it("GetAnswers should return answer list ", () => {
        const newState = reducer(undefined, {
            type: actionTypes.GET_USER_ANSWERS,
            answers: [
                {
                    question_id: 1,
                    author_id: 1,
                    question_type: "RAIN",
                    answer_content: "YES"
                },
                {
                    question_id: 2,
                    author_id: 1,
                    question_type: "LINES",
                    answer_content: "NO"
                }
            ]
        });
        expect(newState).toEqual({
            ...initialState,
            answers: [
                {
                    question_id: 1,
                    author_id: 1,
                    question_type: "RAIN",
                    answer_content: "YES"
                },
                {
                    question_id: 2,
                    author_id: 1,
                    question_type: "LINES",
                    answer_content: "NO"
                }
            ]
        });
    });

    // Test rate up reducer
    it("CheckRating should return is rated", () => {
        const newState = reducer(undefined, {
            type: actionTypes.RATE_UP,
            answer_id: 1,
            rated_up: 1,
            rated_down: 0
        });
        expect(newState).toEqual({
            ...initialState,
            answer_id: 1,
            rated_up: 1,
            rated_down: 0
        });
    });

    // Test rate down reducer
    it("CheckRating should return is rated", () => {
        const newState = reducer(undefined, {
            type: actionTypes.RATE_DOWN,
            answer_id: 1,
            is_rated: true,
            rated_up: 1,
            rated_down: 0
        });
        expect(newState).toEqual({
            ...initialState,
            answer_id: 1,
            is_rated: true,
            rated_up: 1,
            rated_down: 0
        });
    });
});
