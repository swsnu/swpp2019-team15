import React, {Component} from 'react';
import { shallow, mount } from 'enzyme';
import { Route, Redirect } from 'react-router';
import {Provider} from 'react-redux';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('<PrivateRoute/>', () => {
  it('redirects if not logged in', () => {
    const store = mockStore({ auth: { authenticated: false, } });
    let pr =  (
      <Router>
      <Provider store={store}>
      <Route 
        path='/' 
        render={() => <PrivateRoute/>}/>
      </Provider>
      </Router>
    );
    const wrapper = mount(pr);
    expect(wrapper.find(Redirect).length).toBe(1);
  });

  it('renders components if logged in', () => {
    const store = mockStore({ auth: { authenticated: false, } });
    //some dummy component
    let component = () => <h1 id="test">Loren Ipsum</h1>;
    let pr =  (
      <Router>
      <Provider store={store}>
      <Route 
        path='/' 
        render={() => <PrivateRoute component={component}/>}/>
      </Provider>
      </Router>
    );
    const wrapper = mount(pr);
    expect(wrapper.find("#test").length).toBe(1);
  });
});
