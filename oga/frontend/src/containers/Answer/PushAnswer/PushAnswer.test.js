import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import thunk from "redux-thunk";
import PushAnswer from "./PushAnswer.js";
import { history } from "../../../store/store";
import * as questionActions from "../../../store/actions/questionActions";
import * as actionCreators from "../../../store/actions/answerActions";

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;
console.error = jest.fn();
jest.mock("../../Map/GoogleMap.js", () => () => "Map");

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    answer: {
        answer: {
            id: 1,
            author: "me",
            question_type: "MANY SEATS",
            publish_date_time: "2019",
            place_name: "HOME"
        }
    },
    question: {
        recommendations: null
    },
    router: history
});
const spyGetQuestion = jest
    .spyOn(questionActions, "getQuestion")
    .mockImplementation(question => {
        return dispatch => {};
    });
const state = { content: "" };

describe("<PushAnswer/>", () => {
    let answer;

    beforeEach(() => {
        answer = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={PushAnswer} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    it("should render without errors", () => {
        const wrapper = mount(answer);
        expect(wrapper.find(".PushAnswer").length).toBe(1);
        expect(wrapper.find(".AnswerView").length).toBe(3);
    });

    it("should not render AnswerView when no answer is provided", () => {
        const store = mockStore({
            answer: {
                answer: null
            },
            question: {
                recommendations: null
            },
            router: history
        });
        answer = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={PushAnswer} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const wrapper = mount(answer);
        expect(wrapper.find(".AnswerView").length).toBe(0);
    });
});
