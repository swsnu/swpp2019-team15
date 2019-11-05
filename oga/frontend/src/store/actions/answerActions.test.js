import axios from 'axios';

import * as actionCreators from './answerActions.js';
import store from '../store.js';

console.error = jest.fn();

describe('answerActions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  it(`'createAnswer' should be called correctly`, (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {id: 1 },
          };
          resolve(result);
        });
      })
    const answer = {
      question_id: 1,
      author_id: 1,
      content: "hello?",
      question_type:"RAIN",
      content: "NO",
    }

    store.dispatch(actionCreators.createAnswer(answer)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`'createAnswer' should be handle error `, (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {id: 1 },
          };
          reject(result);
        });
      })
    const answer = {
      question_id: 1,
      author_id: 1,
      content: "hello?",
      question_type:"RAIN",
      content: "NO",
    }

    store.dispatch(actionCreators.createAnswer(answer)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });


  it(`'getAnswers' should be called correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {id: 1 },
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getAnswers(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getAnswers' should handle error correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {id: 1 },
          };
          reject(result);
        });
      })

    store.dispatch(actionCreators.getAnswers(1)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getAnswer' should be called correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {id: 1 },
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getAnswer(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getAnswer' should be handle error `, (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {id: 1 },
          };
          reject(result);
        });
      })

    store.dispatch(actionCreators.getAnswer(1)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
