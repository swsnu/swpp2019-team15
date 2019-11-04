import axios from 'axios';

import * as actionCreators from './answerActions.js';
import store from '../store.js';

console.error = jest.mock();

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
});
