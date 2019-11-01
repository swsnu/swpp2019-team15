import React, {Component} from 'react';
import { shallow, mount } from 'enzyme';
import { Route, Redirect } from 'react-router';
import {Provider} from 'react-redux';
import SearchBox from './MapSearchBox';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import API_KEY from '../../const/api_key';

const mockStore = configureMockStore();

describe('<PrivateRoute/>', () => {
  let box;
  let map = jest.mock();
  let mapApi = jest.mock();
  let addplace = jest.fn();
  beforeEach(() => {
    box = (<SearchBox map={map} mapApi={mapApi} addplace={addplace}/>)
  });
  it('should render without errors', () => {
    const component = shallow(box)
    const wrapper = component.find('.MapSearchBox');
    expect(wrapper.length).toBe(1);
  });

  it('should handle inputs', () => {
    const component = shallow(box)
    const wrapper = component.find('.input');
    wrapper.value = "seoul";
    expect(wrapper.value).toBe("seoul");
  });

});
