import * as actionTypes from "./actionTypes.js";
import axios from "axios";

import { push } from "connected-react-router";

export const createAnswer_ = answer => {
    return {
        type: actionTypes.CREATE_ANSWER,
        question_id: answer.question_id,
        author_id: answer.author_id,
        question_type: answer.question_type,
        content: answer.answer_content
    };
};

export const createAnswer = (answer, question_id) => {
    return dispatch => {
        return axios
            .post("/api/reply/" + question_id + "/", answer)
            .then(res => {
                dispatch(createAnswer_(res.data));
                dispatch(push("/replies/" + question_id + "/"));
            })
            .catch(err => console.error(err));
    };
};

export const getAnswers_ = answers => {
    return {
        type: actionTypes.GET_ANSWERS,
        answers: answers
    };
};

export const getAnswers = question_id => {
    return dispatch => {
        return axios
            .get("/api/replies/" + question_id + "/")
            .then(res => {
                dispatch(getAnswers_(res.data));
            })
            .catch(err => console.error(err));
    };
};

export const getAllAnswers = () => {
    return dispatch => {
        return axios
            .get("/api/answers/")
            .then(res => {
                dispatch(getAnswers_(res.data));
            })
            .catch(err => console.error(err));
    };
};

// export const getUserAnswers_ = answers => {
//     return {
//         type: actionTypes.GET_USER_ANSWERS,
//         answers: answers
//     };
// };

export const getUserAnswers = (username = "") => {
    return dispatch => {
        return axios
            .get("/api/profile/answers/" + username + "/")
            .then(res => {
                dispatch(getAnswers_(res.data));
            })
            .catch(err => console.error(err));
    };
};

export const getAnswer_ = answer => {
    return {
        type: actionTypes.GET_ANSWER,
        answer: answer
    };
};

export const getAnswer = answer_id => {
    return dispatch => {
        return axios
            .get("/api/reply/" + answer_id + "/")
            .then(res => {
                dispatch(getAnswer_(res.data));
            })
            .catch(err => console.error(err));
    };
};

export const checkRating_ = rate => {
    return {
        type: actionTypes.CHECK_RATING,
        is_rated: rate.is_rated
    };
};

export const checkRating = answer_id => {
    return dispatch => {
        return axios
            .get("/api/rate/is_rated/" + answer_id + "/")
            .then(res => {
                dispatch(checkRating_(res.data));
            })
            .catch(err => console.error(err));
    };
};

export const _rate = rate => {
    return {
        type: actionTypes.RATE_UP,
        answer_id: rate.answer_id,
        rated_up: rate.rated_up+1,
        rated_down: rate.rated_down+1,
    };
};

export const rateUp = answer_id => {
    return dispatch => {
        return axios
            .put("/api/rate/up/" + answer_id + "/")
            .then(res => {
                dispatch(_rate(res.data));
                // timeout needed due to asynchronous call
                // setTimeout(() => window.location.reload(), 0);
            })
            .catch(err => alert("You already rated this answer!"));
    };
};

export const rateDown = answer_id => {
    return dispatch => {
        return axios
            .put("/api/rate/down/" + answer_id + "/")
            .then(res => {
                dispatch(_rate(res.data));
                // timeout needed due to asynchronous call
                setTimeout(() => window.location.reload(), 0);
            })
            .catch(err => alert("You already rated this answer!"));
    };
};
