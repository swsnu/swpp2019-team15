import * as actionTypes from './actionTypes.js';
import axios from 'axios';

import { push } from 'connected-react-router';


export const createAnswer_ = (answer) => {
  return {
    type: actionTypes.CREATE_ANSWER,
    question_id: answer.question_id,
    author_id: answer.author_id,
    question_type: answer.question_type,
    content: answer.answer_content,
  }
}

export const createAnswer = (answer, question_id) => {
  return (dispatch) => {
    return axios.post('/api/reply/'+question_id+'/', answer)
      .then(res => {
        dispatch(createAnswer_(res.data));
        dispatch(push('/main/'));
      })
  }
}

export const getAnswers_ = (answers) => {
  return {
    type: actionTypes.GET_ANSWERS,
    answers: answers,
  }
}

export const getAnswers = (question_id) => {
  return (dispatch) => {
    return axios.get('/api/replies/'+question_id+'/')
      .then(res => {
        dispatch(getAnswers_(res.data));
      })
  }
}

export const getAnswer_ = (answer) => {
  return {
    type: actionTypes.GET_ANSWER,
    answer: answer,
  }
}

export const getAnswer = (answer_id) => {
  return (dispatch) => {
    return axios.get('/api/reply/'+answer_id+'/')
      .then(res => {
        dispatch(getAnswer_(res.data));
      })
  }
}