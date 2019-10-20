import * as actionTypes from './actionTypes.js';
import axios from 'axios';

import { push } from 'connected-react-router';

axios.defaults.xsrfCookieName="csrftoken";
axios.defaults.xsrfHeaderName="X-CSRFTOKEN";

export const createQuestion_ = (question) => {
  return {
    type: actionTypes.CREATE_QUESTION,
    //id: question.id,
    author_id: question.author_id,
    content: question.content,
    target_location: question.target_location
  }
}

export const createQuestion = (question) => {
  return (dispatch) => {
    console.log(question);
    return axios.post('/api/questions/', question)
      .then(res => {
        console.log(res);
        dispatch(createQuestion_(question));
        //dispatch(push('/main/questions/'));
      })
  }
}
