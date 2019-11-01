import axios from 'axios';

import * as actionCreators from './locationActions';
import store from '../store.js';

describe('authActions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it(`'setTargetLocation' should set location correctly`, (done) => {
    const newLocation = {name:"home", geometry:{location: {lat:()=>10, lng:()=>10}}};
    store.dispatch(actionCreators.setTargetLocation(newLocation));
    const newState = store.getState();
    expect(newState.location.targetLocation).toStrictEqual({name:"home", latitude:10, longitude:10});
    done();
  });
});
