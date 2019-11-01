import axios from 'axios';

import * as actionCreators from './questionActions';
import store from '../store.js';

describe('questionActions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  it(`'createQuestion' should be called correctly`, (done) => {
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
    const question = {
      author_id: 1,
      content: "hello?",
      target_location: {
        name:"home",
        longitude:123,
        latitude:123,
      }

    }

    store.dispatch(actionCreators.createQuestion(question)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
