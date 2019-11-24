import * as actionTypes from "../actions/actionTypes";

const initialState = {
    answer_id: null,
    is_rated: null,
    is_up: null,
};

const rateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHECK_RATING:
            return { ...state, answer_id: action.answer_id, is_rated: action.is_rated, is_up: action.is_up};
        case actionTypes.RATE_UP:
            return { ...state, answer_id: action.answer_id, is_rated: action.is_rated, is_up: action.is_up};
        case actionTypes.RATE_DOWN:
            return { ...state, answer_id: action.answer_id, is_rated: action.is_rated, is_up: action.is_up};
        default:
            break;
    }
    return state;
};

export default rateReducer;
