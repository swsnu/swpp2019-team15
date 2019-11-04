import React, {Component} from 'react';
import { shallow, mount } from 'enzyme';
import {Provider} from 'react-redux';
import Question from './Question';


describe('<Question/>', () => {
  it('renders without errros', () => {
    const component = shallow(<Question/>);
    const wrapper = component.find(".Question");
    expect(wrapper.length).toBe(1);
  });

  it('renders without errros', () => {
    const component = shallow(<Question is_answered={false}/>);
    const wrapper = component.find(".Question");
    expect(wrapper.length).toBe(1);
  });

  it('renders without errros', () => {
    const component = shallow(<Question is_answered={true}/>);
    const wrapper = component.find(".Question");
    expect(wrapper.length).toBe(1);
  });

});
