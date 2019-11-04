import React from 'react';

import reducer from './locationReducer';
import * as actionTypes from '../actions/actionTypes';

describe('Location Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({name: null, targetLocation: null, currentCoordinates:null}); 
  });

  it('should set coordinates', () => {
    const oldState = reducer(undefined, {});
    const coordinates = {
      latitude: 123,
      longitude: 123,
    }
    const newState = reducer(undefined, {
      type: actionTypes.SET_CURRENT_COORDINATES,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    expect(newState).toEqual({
      ...oldState, currentCoordinates: coordinates });
  });
})
