import React, {Component} from 'react';
import { shallow, mount } from 'enzyme';
import PushNotification from './PushNotification';
import axios from 'axios';

describe('<PushNotification/>', () => {
  let box;
  let mockregistration = jest.mock();
  mockregistration.pushManager = jest.mock();
  mockregistration.pushManager.subscribe = jest.fn(() => "HI");
  let register = jest.fn((filename) => Promise.resolve(mockregistration));

  Object.defineProperty(global.navigator, 'serviceWorker', {
    value: {
      register: register,
    },
    configurable: true,
  });

  Object.defineProperty(global.window, 'pushManager', {
    value: {
      register: register,
    },
    configurable: true,
  });

  global.Notification = {requestPermission: jest.fn()}
  Error = jest.fn();


  let addplace = jest.fn();
  beforeEach(() => {
    box = <PushNotification/>
  });
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render without errors', () => {
    const component = shallow(box)
    const wrapper = component.find('.PushNotification');
    expect(wrapper.length).toBe(1);
  });

  it('should register sw.js without errors ', () => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
            data: {data: {success:true}},
          };
          resolve(result);
        });
      })
    const component = mount(box);
    let wrapper = component.find('#subscribe-button');
    wrapper.simulate('click');
    expect(register).toBeCalledWith('/sw.js');
    //FIXME
    //expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should catch error thrown during permission ', () => {
    //let register = jest.fn((filename) => Promise.resolve( () => {}));
    global.Notification = {requestPermission: 3}
    const component = mount(box);
    let wrapper = component.find('#subscribe-button');
    //console.log(global.navigator.serviceWorker.register);
    wrapper.simulate('click');
    expect(Error).toHaveBeenCalled();
  });

  it('should register notification with permission ', () => {
    //let register = jest.fn((filename) => Promise.resolve( () => {}));
    global.Notification = {requestPermission: jest.fn((res) => Promise.resolve('granted'))}
    const component = mount(box);
    let wrapper = component.find('#subscribe-button');
    //console.log(global.navigator.serviceWorker.register);
    wrapper.simulate('click');
    expect(Error).toHaveBeenCalled();
  });

  it('should resolve permission ', () => {
    //let register = jest.fn((filename) => Promise.resolve( () => {}));
    global.Notification = {requestPermission: jest.fn((f) => f)}
    const component = mount(box);
    let wrapper = component.find('#subscribe-button');
    //console.log(global.navigator.serviceWorker.register);
    wrapper.simulate('click');
    expect(Error).toHaveBeenCalled();
  });

  it('should not register notification with permission ', () => {
    //let register = jest.fn((filename) => Promise.resolve( () => {}));
    global.Notification = {requestPermission: jest.fn((res) => Promise.resolve('denied'))}
    const component = mount(box);
    let wrapper = component.find('#subscribe-button');
    //console.log(global.navigator.serviceWorker.register);
    wrapper.simulate('click');
    expect(Error).toHaveBeenCalled();
  });

  it('should not register sw.js with bad status ', () => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {data: {success:true}},
          };
          resolve(result);
          reject(result);
        });
      })
    const component = mount(box);
    let wrapper = component.find('#subscribe-button');
    wrapper.simulate('click');
    expect(register).toBeCalledWith('/sw.js');
    //FIXME
    //expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should not register sw.js with bad status ', () => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
            data: {data: {success:false}},
          };
          resolve(result);
          reject(result);
        });
        done();
      })
    const component = mount(box);
    let wrapper = component.find('#subscribe-button');
    wrapper.simulate('click');
    expect(register).toBeCalledWith('/sw.js');
    //FIXME
    //expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not register sw.js with error thrown ', () => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(url => {
          throw new Error("err");
      })
    const component = mount(box);
    let wrapper = component.find('#subscribe-button');
    wrapper.simulate('click');
    expect(register).toBeCalledWith('/sw.js');
    //FIXME
    //expect(spy).toHaveBeenCalledTimes(1);
  });

  xit('should not register sw.js with bad response ', () => {
    let register = jest.fn((filename) => Promise.resolve( () => {}));
    set(register)
    const component = mount(box);
    let wrapper = component.find('#subscribe-button');
    //console.log(global.navigator.serviceWorker.register);
    wrapper.simulate('click');
    expect(register).toBeCalledWith('/sw.js');
  });

});
