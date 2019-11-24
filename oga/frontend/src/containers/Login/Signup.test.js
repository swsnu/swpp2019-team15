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
import Signup from './Signup.js';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  auth: {
    username: '',
    password: '',
  },
  router: history
});

describe('<Signup/>', () => {
  let signup;
  let alert;

  beforeEach(() => {
    alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    signup = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={Signup} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })
  afterEach(() => {
    jest.clearAllMocks();
    
  })
  

  it('should render without errors', () => {
    const wrapper = mount(signup);
    expect(wrapper.find(".Signup").length).toBe(1);
  });

  it('should handle id inputs', () => {
    const newuser = 'newuser';
    const component = mount(signup);
    const wrapper = component.find("#username-input");
    wrapper.hostNodes().simulate('change', {target: {value: newuser }});
    const instance = component.find(Signup.WrappedComponent).instance();
    expect(instance.state.username).toBe(newuser);
  });

  it('should handle password inputs', () => {
    const password = '1234';
    const component = mount(signup);
    const wrapper = component.find("#pw-input");
    wrapper.hostNodes().simulate('change', {target: {value:password} });
    const instance = component.find(Signup.WrappedComponent).instance();
    expect(instance.state.password).toBe(password);
  });

  it('should handle confirm password inputs', () => {
    const password = '1234';
    const component = mount(signup);
    const wrapper = component.find("#confirm-pw-input");
    wrapper.hostNodes().simulate('change', {target: {value:password} });
    const instance = component.find(Signup.WrappedComponent).instance();
    expect(instance.state.confirmPassword).toBe(password);
  });

  it('should redirect to signin page', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(signup);
    let wrapper = component.find('#login-button');
    wrapper.hostNodes().simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should alert without username ', () => {
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const component = mount(signup);
    let wrapper = component.find('#signup-button');
    wrapper.hostNodes().simulate('click');
    expect(alert).toHaveBeenCalledTimes(1);
  });

  it('should alert with username and without password', () => {
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const component = mount(signup);
    const usernameinput = component.find("#username-input");
    usernameinput.hostNodes().simulate('change', {target: {value:"user"} });
    let wrapper = component.find('#signup-button');
    wrapper.hostNodes().simulate('click');
    expect(alert).toHaveBeenCalledTimes(1);
  });

  it('should alert with wrong password confirmation', () => {
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const component = mount(signup);
    let input_component = component.find("#username-input");
    input_component.hostNodes().simulate('change', {target: {value:"user"} });
    input_component = component.find("#pw-input");
    input_component.hostNodes().simulate('change', {target: {value:"123"} });
    input_component = component.find("#confirm-pw-input");
    input_component.hostNodes().simulate('change', {target: {value:"1234"} });
    let wrapper = component.find('#signup-button');
    wrapper.hostNodes().simulate('click');
    expect(alert).toHaveBeenCalledTimes(1);
  });

  it('should success signup with correct inputs ', () => {
    const spySignup = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(data => { return dispatch => {}; });
    const component = mount(signup);
    let input_component = component.find("#username-input");
    let username = "user";
    let password = "1234";
    input_component.hostNodes().simulate('change', {target: {value:"user"} });
    input_component = component.find("#pw-input");
    input_component.hostNodes().simulate('change', {target: {value:password} });
    input_component = component.find("#confirm-pw-input");
    input_component.hostNodes().simulate('change', {target: {value:password} });
    let wrapper = component.find('#signup-button');
    wrapper.hostNodes().simulate('click');
    expect(alert).toHaveBeenCalledTimes(0);
    expect(spySignup).toHaveBeenCalledTimes(1);
  });


});
