import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "../../store/store";
import thunk from "redux-thunk";
import Profile from "./Profile.js";

import * as questionActions from "../../store/actions/questionActions";
import * as answerActions from "../../store/actions/answerActions";
import * as authActions from "../../store/actions/authActions";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    auth: {
        profile: [
            {
                id: 1,
                username: "",
                location: "",
                coordinates: ""
            }
        ]
    },
    question: {
        questions: [
            {
                id: 1,
                author: "firstUser",
                publish_date_time: "2019",
                content: "test",
                location: "home",
                is_answered: false
            }
        ]
    },
    answer: {
        answers: [
            {
                id: 1,
                author: "secondUser",
                question_type: "MANY SEATS",
                publish_date_time: "2019",
                place_name: "home"
            }
        ]
    },
    router: history
});

describe("<Profile />", () => {
    let profile;

    beforeEach(() => {
        profile = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Profile} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render without errors", () => {
        const wrapper = mount(profile);
        expect(wrapper.find(".Profile").length).toBe(3);
    });

    it("should render profile details without errors", () => {
        const spyProfileQuestions = jest
            .spyOn(questionActions, "getUserQuestions")
            .mockImplementation(() => {
                return dispatch => {};
            });
        const spyProfileAnswers = jest
            .spyOn(answerActions, "getUserAnswers")
            .mockImplementation(() => {
                return dispatch => {};
            });
        const spyProfile = jest
            .spyOn(authActions, "getProfile")
            .mockImplementation(() => {
                return dispatch => {};
            });
        const wrapper = mount(profile);
        expect(spyProfile).toHaveBeenCalled();
        expect(spyProfileQuestions).toHaveBeenCalled();
        expect(spyProfileAnswers).toHaveBeenCalled();
    });

    xit("should render profile details without errors", () => {
        let newProfile = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={Profile} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        const spyProfileQuestions = jest
            .spyOn(questionActions, "getSingleUserQuestions")
            .mockImplementation(username => {
                return dispatch => {};
            });
        const spyProfileAnswers = jest
            .spyOn(answerActions, "getSingleUserAnswers")
            .mockImplementation(username => {
                return dispatch => {};
            });
        const spyProfile = jest
            .spyOn(authActions, "getUserProfile")
            .mockImplementation(username => {
                return dispatch => {};
            });

        const wrapper = mount(newProfile);
        wrapper.setProps({ match: { params: { username: true } } });

        expect(spyProfile).toHaveBeenCalled();
        expect(spyProfileQuestions).toHaveBeenCalled();
        expect(spyProfileAnswers).toHaveBeenCalled();
    });

    it("should go to detail page when question clicked", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const wrapper = mount(profile);
        const instance = wrapper.find(Profile.WrappedComponent).instance();
        const m = jest.spyOn(instance, "onClickDetailHandler");
        wrapper
            .find("Question")
            .props()
            .clickDetail();
        //button.hostNodes().simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
        expect(m).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledWith("/replies/1");
    });
});
