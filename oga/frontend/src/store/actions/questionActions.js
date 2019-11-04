import * as actionTypes from "./actionTypes.js";
import axios from "axios";

import { push } from "connected-react-router";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export const createQuestion_ = (question, id) => {
    return {
        type: actionTypes.CREATE_QUESTION,
        id: id,
        author: question.author,
        content: question.content,
        target_location: question.target_location
    };
};

export const createQuestion = question => {
    return dispatch => {
        return axios.post("/api/questions/", question).then(res => {
            dispatch(createQuestion_(question, res.data.id));
          dispatch(push("/main")); })
        .catch(err => console.log(err));
    };
};

export const getQuestions_ = questions => {
    return {
        type: actionTypes.GET_QUESTIONS,
        questions: questions
    };
};

export const getQuestions = () => {
    return dispatch => {
        return axios
            .get("/api/questions/")
            .then(res => dispatch(getQuestions_(res.data)))
            .catch(err => console.log(err));
    };
};

export const getQuestion_ = (question) => {
    return {
        type: actionTypes.GET_QUESTION,
        selectedQuestion: question
    };
};

export const getQuestion = id => {
    return dispatch => {
        return axios
            .get("/api/question/" + id)
            .then(res => dispatch(getQuestion_(res.data)))
            .catch(err => console.log(err));
    };
};

export const followQuestion_ = (question) => {
    return {
        //type: actionTypes.GET_QUESTION,
        //selectedQuestion: question
    };
};

export const followQuestion = id => {
    return dispatch => {
        return axios
            .get("/api/follow/" + id)
            .then(res => {})
            .catch(err => console.log(err));
    };
};
