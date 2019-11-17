import React from 'react'
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from './AppBar';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import settings from '../../containers/Settings/Settings';
import appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

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

// it('should redirect to settings page', () => {
    // const spyHistoryPush = jest.spyOn(history, 'push')
    //   .mockImplementation(path => {});
    // const component = mount(appBar);
    // const button = "settings-button";
    // var wrapper = component.find(
    //     // <AppBar>
    //     //     <Toolbar>
    //     //         <div>
    //     //             <FormGroup>
    //     //                 <Menu>
    //                         <MenuItem id = {button}>
    //                         </MenuItem>
        //                 </Menu>
        //             </FormGroup>
        //         </div>
        //     </Toolbar>
        // </AppBar>
    // );
    // expect(component.length).toBe(1);
    // console.log(component.debug());
    // wrapper = wrapper.find(button);
    // wrapper.hostNodes().simulate('click');
    // // expect(wrapper.length).toBe(1);
    // expect(spyHistoryPush).toHaveBeenCalledTimes(1);
//   });

// it('should redirect to settings page', () => {
//     const spyHistoryPush = jest.spyOn(history, 'push')
//       .mockImplementation(path => {});
//     const component = mount(appBar);
//     let wrapper = component.find('#settings-button');
//     wrapper.hostNodes().simulate('click');
//     expect(spyHistoryPush).toHaveBeenCalledTimes(1);
//   });

});
