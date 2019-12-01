// import * as actionTypes from "../actions/actionTypes";

// const initialState = {
//     answer_id: null,
//     is_rated: null,
//     rate_up: null,
//     rate_down: null,
//     is_up: null,
// };

// const rateReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actionTypes.CHECK_RATING:
//             return { ...state, is_rated: action.is_rated};
//         case actionTypes.RATE_UP:
//             return { ...state, answer_id: action.answer_id, is_rated: true, rate_up: action.rate_up, rate_down: action.rate_down, is_up: true};
//         case actionTypes.RATE_DOWN:
//             return { ...state, answer_id: action.answer_id, is_rated: true, rate_up: action.rate_up, rate_down: action.rate_down, is_up: false};
//         default:
//             break;
//     }
//     return state;
// };

// export default rateReducer;
