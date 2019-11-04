import axios from 'axios';

import * as actionCreators from './authActions';
import store from '../store.js';

const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('authActions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it(`'signIn' should signIn correctly`, (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
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
            status: 201,
            data: {id: 3},
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.signUp()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(alert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'signup' with wrong state should not show success message `, (done) => {
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
      expect(alert).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it(`should catch 'signup' error `, (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 401,
            data: {id: 3},
          };
          reject(result);
        });
      })
    store.dispatch(actionCreators.signUp()).then(() => {
      expect(alert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should catch 'signup' error `, (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
            data: {id: 3},
          };
          reject(result);
        });
      })
    store.dispatch(actionCreators.signUp()).then(() => {
      expect(alert).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it(`should handle error in 'signIn' `, (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
            data: {id: 3},
          };
          reject(result);
        });
      })

    store.dispatch(actionCreators.signIn()).then(() => {
      expect(alert).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
