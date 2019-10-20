import * as actionTypes from './actionTypes.js';
import axios from 'axios';

import { push } from 'connected-react-router';

export const createQuestion_ = (res) => {
  return {
    type: actionTypes.CREATE_QUESTION,
    id: res.data.id,
    author_id: res.data.author_id,
    title: res.data.title,
    content: res.data.content,
  }
}

export const createQuestion = (rd) => {
  return (dispatch) => {
    return axios.post('/api/questions', rd)
      .then(res => {
        dispatch(createQuestion_(res));
        dispatch(push('/main/questions/' + res.data.id))
      })
  }
}
