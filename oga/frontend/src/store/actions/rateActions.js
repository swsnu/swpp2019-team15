// import * as actionTypes from "./actionTypes.js";
// import axios from "axios";

// export const checkRating_ = rate => {
//     return {
//         type: actionTypes.CHECK_RATING,
//         is_rated: rate.is_rated,
//     }
// }

// export const checkRating = answer_id => {
//     return dispatch => {
//         return axios
//             .get("/api/rate/is_rated/" + answer_id + "/")
//             .then(res => {
//                 dispatch(checkRating_(res.data));
//             })
//             .catch(err => console.error(err));
//     }
// }

// export const rateUp_ = rate => {
//     return {
//         type: actionTypes.CHECK_RATING,
//         answer_id: rate.answer_id,
        
//         rate_up: rate.rate_up,
//         rate_down: rate.rate_down,
//     }
// }

// export const rateUp = answer_id => {
//     return dispatch => {
//         return axios
//             .put("/api/rate/up/" + answer_id + "/")
//             .then(res => {
//                 dispatch(rateUp_(res.data));
//             })
//             .catch(err => console.error(err));
//     }
// }

// export const rateDown_ = rate => {
//     return {
//         type: actionTypes.CHECK_RATING,
//         answer_id: rate.answer_id,
//         rate_up: rate.rate_up,
//         rate_down: rate.rate_down,
//     }
// }

// export const rateDown = answer_id => {
//     return dispatch => {
//         return axios
//             .put("/api/rate/down/" + answer_id + "/")
//             .then(res => {
//                 dispatch(rateDown_(res.data));
//             })
//             .catch(err => console.error(err));
//     }
// }