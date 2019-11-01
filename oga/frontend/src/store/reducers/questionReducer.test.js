import React from 'react';

import reducer from './questionReducer.js';
import * as actionTypes from '../actions/actionTypes';

describe('Question Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({selectedQuestion: null, user_name:null, targetLocation: null, questions: []}); 
  });

})
