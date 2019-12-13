import reducer from "./answerReducer.js";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    answer: null,
    answers: [],
    answer_id: null,
    is_rated: null,
    rated_up: 0,
    rated_down: 0,
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

});
