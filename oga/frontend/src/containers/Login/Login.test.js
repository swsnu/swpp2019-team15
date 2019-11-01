import React from 'react';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/authActions';
import thunk from 'redux-thunk';
import Login from './Login.js';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  auth: {
    username: '',
    password: '',
  }
});
const state = {userid: '', passwd: ''};

describe('<Login />', () => {
  let login;

  beforeEach(() => {
    login = (
      <Router>
        <Provider store={store}>
          <Route path='/' exact component={Login} />
        </Provider>
      </Router>
    );
  })

  it('should render without errors', () => {
    const wrapper = mount(login);
    expect(wrapper.find(".Login").length).toBe(1);
  });

  it('should render without errors', () => {
    const wrapper = mount(login);
    expect(wrapper.find(".Login").length).toBe(1);
  });

  it('should handle id inputs', () => {
    const newuser = 'newuser';
    const component = mount(login);
    const wrapper = component.find("#username-input");
    wrapper.simulate('change', {target: {value: newuser }});
    const loginInstance = component.find(Login.WrappedComponent).instance();
    expect(loginInstance.state.username).toBe(newuser);
  });

  it('should handle password inputs', () => {
    const password = '1234';
    const component = mount(login);
    const wrapper = component.find("#pw-input");
    wrapper.simulate('change', {target: {value:password} });
    const loginInstance = component.find(Login.WrappedComponent).instance();
    expect(loginInstance.state.password).toBe(password);
  });

  it('should handle login button clicks', () => {
    const spySignIn = jest.spyOn(actionCreators, 'signIn')
      .mockImplementation(td => { return dispatch => {}; });
    const component = mount(login);
    let wrapper = component.find('#login-button');
    wrapper.simulate('click');
    expect(spySignIn).toHaveBeenCalledTimes(1);
  });

  it('should handle signup button clicks', () => {
    const spySignUp = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(td => { return dispatch => {}; });
    const component = mount(login);
    let wrapper = component.find('#signup-button');
    wrapper.simulate('click');
    expect(spySignUp).toHaveBeenCalledTimes(1);
  });


});
