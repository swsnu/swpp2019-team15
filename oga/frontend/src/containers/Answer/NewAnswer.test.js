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
import NewAnswer from './NewAnswer.js';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/questionActions';

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;
//jest.mock('../../Map/GoogleMap.js', () => () => 'Map');

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

describe('<NewAnswer/>', () => {
  let answer;

  beforeEach(() => {
    answer = (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={NewAnswer} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const spyGetQuestion = jest.spyOn(actionCreators, 'getQuestion')
      .mockImplementation(question => { return dispatch => {}; });
  })

  it('should render without errors', () => {
    const wrapper = mount(answer);
    expect(wrapper.find(".Answer").length).toBe(1);
  });

  it('should change answer content ', () => {
    const wrapper = mount(answer);
    const component = wrapper.find("#question-type");
    const answer_data = "NO";
    //component.props.onChange(answer_data);
    component.simulate('change',{target: {value: answer_data}});
    const instance = wrapper.find(NewAnswer.WrappedComponent).instance();
    //wrapper.simulate('change', {target: {value: newuser }});
    expect(instance.state.answer_content).toBe(answer_data);
  });

  it('should call goBack upon click back', () => {
    const wrapper = mount(answer);
    const component = wrapper.find("#question-type");
    const answer_data = "NO";
    //component.props.onChange(answer_data);
    component.simulate('change',{target: {value: answer_data}});
    const instance = wrapper.find(NewAnswer.WrappedComponent).instance();
    //wrapper.simulate('change', {target: {value: newuser }});
    expect(instance.state.answer_content).toBe(answer_data);
  });


});