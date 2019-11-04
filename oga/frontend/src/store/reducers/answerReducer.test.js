import React from 'react';

import reducer from './answerReducer.js';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  answer: null,
  answers: []
}
describe('Answer Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual(initialState); 
  });

  it('should return new answer upon create', () => {
    const newState = reducer(undefined, {
      type: actionTypes.CREATE_ANSWER,
      question_id: 1,
      author_id: 2,
      question_type: "RAIN",
      answer_content: 3
    });
    expect(newState).toEqual({
      answer: {
        question_id: 1,
        author_id: 2,
        question_type: "RAIN",
        answer_content: 3},
      answers: [] });
  });

})
