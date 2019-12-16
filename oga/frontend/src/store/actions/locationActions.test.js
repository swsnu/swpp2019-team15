import axios from 'axios';

import * as actionCreators from './locationActions';
import store from '../store.js';

describe('authActions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it(`'setTargetLocation' should set location correctly`, (done) => {
    const newLocation = {name:"home", geometry:{location: {lat:()=>10, lng:()=>10}}, types: ["cafe"]};
    store.dispatch(actionCreators.setTargetLocation(newLocation));
    const newState = store.getState();
    expect(newState.location.targetLocation).toStrictEqual({name:"home", latitude:10, longitude:10, place_type:"cafe"});
    done();
  });

  it(`'setCurrentLocation' should set current location correctly`, (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, coords) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {},
          };
          resolve(coords);
        });
      });

    const newCoordinates = {latitude: 12, longitude:10};

    store.dispatch(actionCreators.setCurrentCoordinates(newCoordinates)).then(() => {
      const newState = store.getState();
      expect(newState.location.currentCoordinates).toStrictEqual(newCoordinates);
      done(); });
  });

  it(`'setCurrentLocation' should not change location upon error`, (done) => {
    const oldState = store.getState();
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {},
          };
          reject(result);
        });
      });
    const newCoordinates = {latitude: 10, longitude:11};

    store.dispatch(actionCreators.setCurrentCoordinates(newCoordinates)).then(() => {
      const newState = store.getState();
      expect(newState).toBe(oldState);
      done(); });
  });
});
