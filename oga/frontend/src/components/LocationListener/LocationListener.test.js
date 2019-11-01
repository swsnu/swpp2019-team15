import React, {Component} from 'react';
import { shallow, mount } from 'enzyme';
import { Route, Redirect, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import haversine from 'haversine'
import thunk from 'redux-thunk';
import { history } from '../../store/store';
import LocationListener from './LocationListener';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import * as actionCreators from '../../store/actions/locationActions'; 

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  router: history
});
const state = {
  latitude: 0,
  longitude: 0,
  //unused, but might be useful
  //routeCoordinates: [],
  //unused, but might be useful
  //totalDistanceMoved: 0,
  previousCoordinates: {latitude:1, longitude: 3},
};
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
  .mockImplementationOnce((success) => Promise.resolve(success({
    coords: {
      latitude: 51.1,
      longitude: 45.3
    }
  }))),
};
global.navigator.geolocation = mockGeolocation;

describe('<LocationListener/>', () => {
  let listener;

  beforeEach(() => {
    listener = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={LocationListener} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  it('should render without errors', () => {
    const wrapper = mount(listener);
    expect(wrapper.find(".LocationListener").length).toBe(1);
  });

  it('should set coordinates upon location change', () => {
    const spy = jest.spyOn(actionCreators, 'setCurrentCoordinates').mockImplementation(coords => { return dispatch => {}; });
    const wrapper = mount(listener);
    const instance = wrapper.find(LocationListener.WrappedComponent).instance();
    instance.setState(state);
    global.navigator.geolocation.watchPosition = 
      jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
        coords: {
          latitude: 101.1,
          longitude: 105.3
        }
      })));
    instance.componentDidMount();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call error upon watchPosition failure', () => {
  });
});
