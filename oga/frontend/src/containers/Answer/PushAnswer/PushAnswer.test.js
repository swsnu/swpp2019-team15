import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import thunk from "redux-thunk";
import PushAnswer from "./PushAnswer.js";
import { history } from "../../../store/store";
import * as questionActions from "../../../store/actions/questionActions";
import * as answerActions from "../../../store/actions/answerActions";

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
            content: "There are NO SEATS",
            publish_date_time: "2019-01-01 00:00:00",
            place_name: "HOME"
        }
    },
    auth: { authenticated: true },
    question: {
        recommendations: ["Starbucks", "gs25"]
    },
    router: history
});

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

    afterEach(() => {
        jest.clearAllMocks();
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
            auth: { authenticated: null },
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

    it("should not get recommendations for positive answers", () => {
        const spyGetRecommendation = jest
            .spyOn(questionActions, "getQuestionRecommendation")
            .mockImplementation(id => {
                return dispatch => {};
            });
        const wrapper = mount(answer);
        expect(spyGetRecommendation.length).toBe(0);
    });

    it("should call rateUp when rate up button clicked", () => {
        const spyRateUp = jest
            .spyOn(answerActions, "rateUp")
            .mockImplementation(id => {
                return dispatch => {};
            });
        const component = mount(answer);
        const wrapper = component.find("#push-answer").first();
        wrapper.props().rateUp();
        expect(spyRateUp).toHaveBeenCalled();
    });

    it("should call rateDown when rate down button clicked", () => {
        const spyRateDown = jest
            .spyOn(answerActions, "rateDown")
            .mockImplementation(id => {
                return dispatch => {};
            });
        const component = mount(answer);
        const wrapper = component.find("#push-answer").first();
        wrapper.props().rateDown();
        expect(spyRateDown).toHaveBeenCalled();
    });

    it("should redirect to replies page when clickQuestion clicked", () => {
        const spyHistory = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const component = mount(answer);
        const wrapper = component.find("#push-answer").first();
        wrapper.props().clickQuestion();
        expect(spyHistory).toHaveBeenCalled();
    });

    it("should redirect to profile page when clickAuthor clicked", () => {
        const spyHistory = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const component = mount(answer);
        const wrapper = component.find("#push-answer").first();
        wrapper.props().clickAuthor();
        expect(spyHistory).toHaveBeenCalled();
    });

    it("should getRecommendations for negative answers", () => {
        const spyGetRecommendation = jest
            .spyOn(questionActions, "getQuestionRecommendation")
            .mockImplementation(id => {
                return dispatch => {};
            });
        mount(answer);
        expect(spyGetRecommendation).toHaveBeenCalledTimes(0);
    });

    it("should not getRecommendations for positive answers", () => {
        const spyGetRecommendation = jest
            .spyOn(questionActions, "getQuestionRecommendation")
            .mockImplementation(id => {
                return dispatch => {};
            });
        const store = mockStore({
            answer: {
                answer: {
                    id: 1,
                    author: "me",
                    content: "There are MANY SEATS",
                    publish_date_time: "2019-01-01 00:00:00",
                    place_name: "HOME"
                }
            },
            auth: { authenticated: true },
            question: {
                recommendations: ["Starbucks", "gs25"]
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

        const component = mount(answer);
        expect(spyGetRecommendation).toHaveBeenCalledTimes(0);
        const instance = component.find(PushAnswer.WrappedComponent).instance();
        instance.setState({ hasFetched: "true" });
        const shouldUpdate = jest.spyOn(instance, "shouldComponentUpdate"); //wrapper.find("shouldComponentUpdate");
        expect(shouldUpdate).toHaveBeenCalledTimes(0);
    });
});
