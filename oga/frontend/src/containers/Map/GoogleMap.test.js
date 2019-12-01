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
import Map from "./GoogleMap.js";

const mockStore = configureMockStore([thunk]);

describe("<Map/>", () => {
    let map;
    let gmap = jest.mock();
    let mapApi = jest.mock();
    mapApi.places = jest.mock();
    const store = mockStore({
        location: {
            latitude: 2,
            longitude: 1
        },
        router: history
    });

    const mockGeolocation = {
        getCurrentPosition: jest.fn(),
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

    let mockClearInstanceListeners = jest.fn(() => {});
    mapApi.event = { clearInstanceListeners: mockClearInstanceListeners };

    let mockGetPlaces = jest.fn(() => ["home"]);
    mapApi.places.SearchBox = jest.fn(() => ({
        addListener: jest.fn(() => {}),
        bindTo: jest.fn(() => {}),
        getPlaces: mockGetPlaces
    }));

    let addplace = jest.fn();
    jest.mock("../../components/LocationListener/LocationListener", () => () =>
        "listener"
    );
    jest.mock("../../components/MapSearchBox/MapSearchBox.js", () => () =>
        "searchbox"
    );

    beforeEach(() => {
        map = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Map} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    it("should render without errors", () => {
        const component = mount(map);
        const wrapper = component.find(".Map");
        expect(wrapper.length).toBe(3);
    });
});
