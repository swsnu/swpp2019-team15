import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import {connect} from 'react-redux';

import App from './App';
import Main from './containers/Main/Main';
import { history } from './store/store';
import configureMockStore from 'redux-mock-store';
import * as actionCreators from './store/actions/index';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const store = mockStore({auth: {authenticated: true}, router:history});
jest.mock("./containers/Main/Main", () => () => <div></div>);

describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )
  });
  it('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });

  it('should render with false state', () => {
    const storetest = mockStore({auth: {authenticated: false}, router:history});
    let apptest = (
      <Provider store={storetest}>
        <App history={history}/>
      </Provider>
    )
    const component = mount(apptest);
    expect(component.find('.App').length).toBe(1);
  });

  it('should render Not Found', () => {
    history.push('/aaa');
    const component = mount(app);
    expect(component.find('h1').text()).toBe("Not Found");
  });

  it('should render Not Found', () => {
    history.push('/aaa');
    const component = mount(app);
    expect(component.find('h1').text()).toBe("Not Found");
  });
});
