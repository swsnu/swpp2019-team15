import React, { Component } from "react";
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connect } from "react-redux";
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import * as actionCreators from "../../store/actions/";
import AppBar from './AppBar';
import WrappingAppBar from "./WrappingAppBar";

import { history } from '../../store/store';
import configureMockStore from 'redux-mock-store';
// import * as actionCreators from './store/actions/authActions';
import thunk from 'redux-thunk';
import ShallowRenderer from 'react-router-dom';

console.error = jest.fn();
console.log = jest.fn();

jest.mock('./AppBar.js', () => {
    return jest.fn(props => {
      return (
        <div className="spyAppBar">
        </div>);
  
    });
  });

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    auth: {authenticated: true},
    router: history,
});


describe('<WrappingAppBar />', () => {
  let wrappingAppBar;

  beforeEach(() => {
    wrappingAppBar = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={WrappingAppBar} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = shallow(<wrappingAppBar/>);
    expect(component.length).toBe(1);
  });

});