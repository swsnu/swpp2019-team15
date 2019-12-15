import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "../../store/store";
import thunk from "redux-thunk";
import Profile from "./Profile.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
                publish_date_time: "2019-01-01 00:00:00",
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
                question_type: "Are there MANY SEATS",
                publish_date_time: "2019-01-01 00:00:00",
                place_name: "home"
            }
        ]
    },
    router: history
});

describe("<Profile />", () => {
    let profile;
    const spyProfile = jest
        .spyOn(authActions, "getProfile")
        .mockImplementation(() => {
            return dispatch => {};
        });
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
        const wrapper = mount(profile);
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

    it("should change tab state when 'My Question' button clicked", () => {
        const wrapper = mount(profile);
        wrapper
            .find("#my-question-tab")
            .hostNodes()
            .simulate("click");

        const tab = wrapper.find(Profile.WrappedComponent).state()
            .isQuestionTab;
        expect(tab).toBeTruthy();
    });

    it("should change tab state when 'My Answer' button clicked", () => {
        const wrapper = mount(profile);
        wrapper
            .find("#my-answer-tab")
            .hostNodes()
            .simulate("click");

        const tab = wrapper.find(Profile.WrappedComponent).state()
            .isQuestionTab;
        expect(tab).toBe(false);
    });

    it("should go to detail page when answer clicked", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const wrapper = mount(profile);
        const instance = wrapper.find(Profile.WrappedComponent).instance();
        const m = jest.spyOn(instance, "onClickDetailHandler");
        wrapper
            .find(Card)
            .first()
            .find(CardContent)
            .simulate("click");

        setTimeout(() => {
            expect(spyHistoryPush).toHaveBeenCalledTimes(1);
            expect(m).toHaveBeenCalledTimes(1);
            expect(spyHistoryPush).toHaveBeenCalledWith("/replies/1");
        }, 0);
    });
});
