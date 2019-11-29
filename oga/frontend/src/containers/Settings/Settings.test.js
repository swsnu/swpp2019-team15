import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/authActions";
import thunk from "redux-thunk";
import Settings from "./Settings.js";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    router: history
});
const state = { userid: "", passwd: "" };
const position = jest.mock();
position.coords = { latitude: 1, longitude: 1 };
const mockCurrentPostion = jest.fn(f => f(position));
const mockGeolocation = {
    getCurrentPosition: mockCurrentPostion,
    watchPosition: jest.fn().mockImplementationOnce(success =>
        Promise.resolve(
            success({
                coords: {
                    latitude: 51.1,
                    longitude: 45.3
                }
            })
        )
    )
};
global.navigator.geolocation = mockGeolocation;

describe("<Settings />", () => {
    let settings;

    beforeEach(() => {
        settings = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Settings} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render without errors", () => {
        const wrapper = mount(settings);
        expect(wrapper.find(".Settings").length).toBe(1);
    });

    it("should call clickLocationHandler when location toggle clicked", () => {
        const component = mount(settings);
        const instance = component.find(".Settings").instance();
        const spyLocationHandler = jest
            .spyOn(instance, "clickLocationHandler")
            .mockImplementation(path => {});

        component.find("#location-toggle").simulate("click");
        expect(spyLocationHandler).toHaveBeenCalledTimes(1);
    });

    xit("should handle back button clicks", () => {
        const spyHistoryPush = jest
            .spyOn(history, "goBack")
            .mockImplementation(path => {});
        const wrapper = mount(settings);
        let button = wrapper.find("#back-button");
        button.hostNodes().simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    xit("should redirect to signup page", () => {
        const spyHistoryPush = jest
            .spyOn(history, "goBack")
            .mockImplementation(path => {});
        const component = mount(settings);
        let wrapper = component.find("#back-button");
        wrapper.hostNodes().simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});
