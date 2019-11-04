import React, {Component} from 'react';
import { shallow, mount } from 'enzyme';
import PushNotification from './PushNotification';

describe('<PushNotification/>', () => {
  let box;
  let map = jest.mock();
  let mapApi = jest.mock();
  mapApi.places = jest.mock();
  const register = jest.fn((filename) => Promise.resolve(
  jest.fn(() => Promise.resolve(3))));

  Object.defineProperty(global.navigator, 'serviceWorker', {
    value: {
      register: register,
    }
  });

  let mockClearInstanceListeners = jest.fn(() => {});
  mapApi.event = {clearInstanceListeners: mockClearInstanceListeners};

  let mockGetPlaces = jest.fn(() => ['home']);
  mapApi.places.SearchBox = jest.fn(() => 
    ({addListener: jest.fn(() => {}),
      bindTo: jest.fn(() => {}),
      getPlaces: mockGetPlaces,
    }));

  let addplace = jest.fn();
  beforeEach(() => {
    box = <PushNotification/>
  });

  it('should render without errors', () => {
    const component = shallow(box)
    const wrapper = component.find('.PushNotification');
    expect(wrapper.length).toBe(1);
  });

  it('should register sw.js upon click ', () => {
    const component = mount(box);
    let wrapper = component.find('#subscribe-button');
    //console.log(global.navigator.serviceWorker.register);
    wrapper.simulate('click');
    expect(register).toBeCalledWith('/sw.js');
  });

});
