import React from 'react'
import AppBar from './AppBar';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import settings from '../../containers/Settings/Settings';

import { history } from '../../store/store';
import configureMockStore from 'redux-mock-store';
// import * as actionCreators from './store/actions/authActions';
import thunk from 'redux-thunk';
import ShallowRenderer from 'react-router-dom';

const mockStore = configureMockStore([thunk]);
const store = mockStore({auth: {authenticated: true}, router: history});

console.error = jest.fn();
console.log = jest.fn();


describe('<AppBar />', () => {
  let appBar;

  beforeEach(() => {
    appBar = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={AppBar} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = mount(appBar);
    expect(component.find('.AppBar').length).toBe(1);
  });

it('should redirect to settings page', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(appBar);
	// console.log(component.debug());
    let wrapper = component.find("Toolbar").shallow().find("FormGroup").shallow().find("MenuItem");
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

// it('should redirect to settings page', () => {
//     const spyHistoryPush = jest.spyOn(history, 'push')
//       .mockImplementation(path => {});
//     const component = mount(appBar);
//     let wrapper = component.find('#settings-button');
//     wrapper.hostNodes().simulate('click');
//     expect(spyHistoryPush).toHaveBeenCalledTimes(1);
//   });

});
