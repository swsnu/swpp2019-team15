import * as actionTypes from "../actions/actionTypes";

const initialState = {
    answer: null,
    answers: [],
    answer_id: null,
    is_rated: null,
    rated_up: 0,
    rated_down: 0,
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
        case actionTypes.RATE_UP:
            return { ...state, answer_id: action.answer_id, rated_up: action.rated_up, rated_down: action.rated_down, is_up: true};
        case actionTypes.RATE_DOWN:
            return { ...state, answer_id: action.answer_id, rated_up: action.rated_up, rated_down: action.rated_down, is_up: false};
        default:
            break;
    }
    return state;
};

export default answerReducer;
