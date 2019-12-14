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

const answerReducer = (state = initialState, action) => {
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
            for (var i = 0; i < action.answers.length; i++) {
                console.log(action.answers[i])
            }
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
            console.log(ans_id);
            var new_answers = update(state.answers, {
                [ans_id]: {
                    user_liked: {$set: action.is_up},
                    user_disliked: {$set: !action.is_up},
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
