import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from './containers/Login/Login';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import App from './App';
import { history } from './store/store';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({auth: {authenticated: true}, router:history});

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
