import * as actionTypes from './actionTypes.js';
import axios from 'axios';

import { push } from 'connected-react-router';

axios.defaults.xsrfCookieName="csrftoken";
axios.defaults.xsrfHeaderName="X-CSRFTOKEN";

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
    return axios.post('/api/reply/'+question_id, answer)
      .then(res => {
        dispatch(createAnswer_(res.data));
        dispatch(push('/main/'));
      })
  }
}