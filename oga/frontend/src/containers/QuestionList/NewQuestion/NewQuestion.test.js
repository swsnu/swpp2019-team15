import React from 'react';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import thunk from 'redux-thunk';
import NewQuestion from './NewQuestion.js';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/questionActions';

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;
jest.mock('../../Map/GoogleMap.js', () => () => 'Map');

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  question: {
    selectedQuestion: null,
    user_name: null,
    targetLocation: null,
    questions: []
  },
  location: {
    targetLocation: {langitude: 1, longitude: 2},
  },
  router: history
});
const state = {content: ''};

describe('<NewQuestion/>', () => {
  let nq;

  beforeEach(() => {
    nq = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={NewQuestion} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  it('should render without errors', () => {
    const wrapper = mount(nq);
    expect(wrapper.find(".NewQuestion").length).toBe(1);
  });

  it('should render without errors', () => {
    const wrapper = mount(nq);
    expect(wrapper.find(".NewQuestion").length).toBe(1);
  });

  it(`should call 'clickBack'`, () => {
    const spyHistoryBack = jest.spyOn(history, 'goBack')
      .mockImplementation(path => {});
    const component = mount(nq);
    const wrapper = component.find('#back-create-question-button');
    wrapper.simulate('click');
    expect(spyHistoryBack).toHaveBeenCalled();
  });

  it(`should not call 'createQuestion' when empty`, () => {
    const spyHistoryBack = jest.spyOn(actionCreators, 'createQuestion')
      .mockImplementation(question => { return dispatch => {}; });
    const component = mount(nq);
    const instance = component.find(NewQuestion.WrappedComponent).instance();
    instance.setState(state);
    const wrapper = component.find('#confirm-create-question-button');
    wrapper.simulate('click');
    expect(spyHistoryBack).toHaveBeenCalledTimes(0);
  });

  it(`should call 'createQuestion' with content`, () => {
    const spyHistoryBack = jest.spyOn(actionCreators, 'createQuestion')
      .mockImplementation(question => { return dispatch => {}; });
    const component = mount(nq);
    const instance = component.find(NewQuestion.WrappedComponent).instance();
    instance.setState({content: "HI"});
    const wrapper = component.find('#confirm-create-question-button');
    wrapper.simulate('click');
    expect(spyHistoryBack).toHaveBeenCalledTimes(1);
  });

  it(`should update state upon button click`, () => {
    const component = mount(nq);
    //const instance = component.find(NewQuestion.WrappedComponent).instance();
    //instance.setState({content: "HI"});
    const instance = component.find(NewQuestion.WrappedComponent).instance();
    const wrapper = component.find('input');
    wrapper.at(0).simulate('change');
    expect(instance.state.content).toBe("LONG LINE");
  });

  xit(`should show target_location when set `, () => {
    const component = mount(nq);
    component.setProps({question: {target_location:{name: 'school'}}});
    const wrapper = component.find('#view');
    //const instance = component.find(NewQuestion.WrappedComponent).instance();
    expect(wrapper.text()).toBe("Is it  in ?");
    //instance.setState({content: "HI"});
  });

  it(`should goto main when button click`, () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(question => { return dispatch => {}; });
    const component = mount(nq);
    const wrapper = component.find('#main-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith("/main");
  });

  it(`should set not set location name null`, () => {
    const store = mockStore({
      question: {
        selectedQuestion: null,
        user_name: null,
        targetLocation: null,
        questions: []
      },
      location: {
        targetLocation: null,
      },
      router: history
    });
    let nq = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={NewQuestion} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(nq);
    const wrapper = component.find('#view');
    //const instance = component.find(NewQuestion.WrappedComponent).instance();
    expect(wrapper.text()).toBe("Is it .... in ...?");
  });

});
