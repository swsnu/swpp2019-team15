import axios from 'axios';

import * as actionCreators from './authActions';
import store from '../store.js';

describe('authActions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  it(`'signup' should signup correctly`, (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {id: 3},
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.signIn()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`'signup' should signup correctly`, (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {id: 3},
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.signUp()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
