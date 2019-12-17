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

    it("RATE should toggle answer rate", () => {
        const state = {
            answer: null,
            answers: [
                {
                    id: 1,
                    question_id: 1,
                    author_id: 1,
                    question_type: "RAIN",
                    answer_content: "YES",
                    user_liked: false,
                    user_disliked: false
                }
            ],
            is_rated: null,
            rated_up: null,
            rated_down: null
        };
        const newState = reducer(state, {
            type: actionTypes.RATE,
            answer_id: 1,
            is_up: true,
            rated_up: 3,
            rated_down: 2
        });
        expect(newState).toEqual({
            ...state,
            answers: [
                {
                    id: 1,
                    question_id: 1,
                    author_id: 1,
                    question_type: "RAIN",
                    answer_content: "YES",
                    user_liked: true,
                    user_disliked: false,
                    numbers_rated_up: 3,
                    numbers_rated_down: 2
                }
            ]
        });
    });
});
