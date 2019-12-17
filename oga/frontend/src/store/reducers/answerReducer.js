import update from 'immutability-helper';
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    answer: null,
    answers: [],
    answer_id: null,
    is_rated: null,
    rated_up: null,
    rated_down: null,
};

const answerReducer = (state, action) => {
    if (typeof state === 'undefined') return initialState;
    switch (action.type) {
        case actionTypes.CREATE_ANSWER:
            const newAnswer = {
                question_id: action.question_id,
                author_id: action.author_id,
                question_type: action.question_type,
                answer_content: action.answer_content
            };
            return { ...state, answer: newAnswer };
        case actionTypes.GET_ANSWERS:
            return { ...state, answers: action.answers };
        case actionTypes.GET_ANSWER:
            return { ...state, answer: action.answer };
        case actionTypes.GET_USER_ANSWERS:
            return { ...state, answers: action.answers };
        case actionTypes.RATE:
            var ans_id = action.answer_id;
            var ans;
            for (var i = 0; i < state.answers.length; i++) {
                ans = state.answers[i];
                if (ans["id"] == ans_id) {
                    ans_id = i;
                    break;
                }
            }
            var is_up = action.is_up?true:false;
            var ul, ud;
            if (is_up) {
                ul = true;
                ud = false;
            } else {
                ul = false;
                ud = true;
            }
            var new_answers = update(state.answers, {
                [ans_id]: {
                    user_liked: {$set: ul},
                    user_disliked: {$set: ud},
                    numbers_rated_up: {$set: action.rated_up},
                    numbers_rated_down: {$set: action.rated_down}
                }
            });
            return { ...state, answers: new_answers};
        default:
            break;
    }
    return state;
};

export default answerReducer;
