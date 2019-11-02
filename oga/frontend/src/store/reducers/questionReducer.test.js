import React from 'react';

import reducer from './questionReducer.js';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  selectedQuestion: null,
  user_name: null,
  targetLocation: null,
  questions: []
}
describe('Question Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual(initialState); 
  });

  it('should return new question upon create', () => {
    const newState = reducer(undefined, {
      type: actionTypes.CREATE_QUESTION,
      id: 1,
      author_id: 1,
      title:"HI",
      content:"HI",
    });
    expect(newState).toEqual({
      selectedQuestion: null,
      user_name: null,
      targetLocation: null,
      questions: [{id: 1, author_id: 1, title:"HI", content:"HI"}]
    });
  });

  it('should return new question upon create', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_QUESTIONS,
      questions: [{id: 1, author_id: 1, title:"HI", content:"HI"}]
    });
    expect(newState).toEqual({
      selectedQuestion: null,
      user_name: null,
      targetLocation: null,
      questions: [{id: 1, author_id: 1, title:"HI", content:"HI"}]
    });
  });

  it('should return new question upon create', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_QUESTION,
      selectedQuestion: [{id: 1, author_id: 1, title:"HI", content:"HI"}]
    });
    expect(newState).toEqual({
      selectedQuestion: [{id: 1, author_id: 1, title:"HI", content:"HI"}],
      user_name: null,
      targetLocation: null,
      questions: []
    });
  });

})
