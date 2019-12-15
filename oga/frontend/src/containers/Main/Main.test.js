import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/questionActions";
import * as answerActions from "../../store/actions/answerActions";
import thunk from "redux-thunk";
import Main from "./Main.js";

const mockStore = configureMockStore([thunk]);
const spyGetAnswer = jest
    .spyOn(answerActions, "getAllAnswers")
    .mockImplementation(() => {
        return dispatch => {};
    });
const fullStore = mockStore({
    question: {
        questions: [
            {
                id: 1,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
            {
                id: 7,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
            {
                id: 13,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
            {
                id: 15,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
            {
                id: 2,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
            {
                id: 3,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
            {
                id: 5,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
            {
                id: 8,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
            {
                id: 9,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
            {
                id: 10,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
            {
                id: 11,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
            {
                id: 12,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
        ]
    },
    answer: {
        answers: [
            {
                id: 1,
                question_id: 1,
                author: "anon",
                publish_date_time: "2019-01-02 00:00:00",
                question_type: "rain?",
                content: "yes",
                location_name: "home",
                numbers_rated_up: "0",
                numbers_rated_down: "0",
                user_disliked: "0",
                user_liked: "0"
            }
        ]
    },
    auth: {
        username: "",
        password: ""
    },
    router: history
});
const store = mockStore({
    question: {
        questions: [
            {
                id: 1,
                author: "me",
                publish_date_time: "2019-01-01 00:00:00",
                content: "rain?",
                location: "home",
                is_answered: false
            },
        ]
    },
    answer: {
        answers: [
            {
                id: 1,
                question_id: 1,
                author: "anon",
                publish_date_time: "2019-01-02 00:00:00",
                question_type: "rain?",
                content: "yes",
                location_name: "home",
                numbers_rated_up: "0",
                numbers_rated_down: "0",
                user_disliked: "0",
                user_liked: "0"
            }
        ]
    },
    auth: {
        username: "",
        password: ""
    },
    location: {
        currentCoordinates: null,
    },
    router: history
});

describe("<Main />", () => {
    let main;

    beforeEach(() => {
        main = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Main} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render without errors", () => {
        const spySignIn = jest
            .spyOn(actionCreators, "getQuestions")
            .mockImplementation(() => {
                return dispatch => {};
            });
        const wrapper = mount(main);
        expect(wrapper.find(".Main").length).toBe(1);
    });

    it("should go to reply page when clickAnswerHandler", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const wrapper = mount(main);
        const instance = wrapper.find(Main.WrappedComponent).instance();
        const m = jest.spyOn(instance, "clickAnswerHandler");
        let button = wrapper.find("Question");
        wrapper
            .find("Question")
            .at(0)
            .props()
            .clickAnswer();
        //button.hostNodes().simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
        expect(m).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledWith("/reply/create/1");
    });

    it("should go to ask page when clickNewQuestionHandler", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const wrapper = mount(main);
        let button = wrapper.find("#question-create-button");
        button.hostNodes().simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledWith("/ask");
    });

    it("should go to previous page when click back", () => {
        const spyHistoryPush = jest
            .spyOn(history, "goBack")
            .mockImplementation(path => {});
        const wrapper = mount(main);
        let button = wrapper.find("#back-button");
        button.hostNodes().simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should go to settings page when clicking settings", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const wrapper = mount(main);
        let button = wrapper.find("#settings-button");
        button.hostNodes().simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledWith("/settings");
    });

    it("should go to replies page when clickAnswerHandler", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const wrapper = mount(main);
        const instance = wrapper.find(Main.WrappedComponent).instance();
        const m = jest.spyOn(instance, "clickDetailHandler");
        let button = wrapper.find("Question");
        wrapper
            .find("Question")
            .at(0)
            .props()
            .clickDetail();
        //button.hostNodes().simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
        expect(m).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledWith("/replies/1");
    });

    it("should go to profiles page when clicking author name", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const wrapper = mount(main);
        const instance = wrapper.find(Main.WrappedComponent).instance();
        const m = jest.spyOn(instance, "clickAuthorHandler");
        let button = wrapper.find("Question");
        wrapper
            .find("Question")
            .at(0)
            .props()
            .clickAuthor();
        //button.hostNodes().simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
        expect(m).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledWith("/profile/me");
    });

    it("should call onFollow when clickAnswerHandler", () => {
        const spyFollow = jest
            .spyOn(actionCreators, "followQuestion")
            .mockImplementation(path => {
                return dispatch => {};
            });
        const wrapper = mount(main);
        const instance = wrapper.find(Main.WrappedComponent).instance();
        const m = jest.spyOn(instance, "clickFollowHandler");
        let button = wrapper.find("Question");
        wrapper
            .find("Question")
            .at(0)
            .props()
            .clickFollow();
        //button.hostNodes().simulate('click');
        expect(m).toHaveBeenCalledTimes(1);
        expect(spyFollow).toHaveBeenCalledTimes(1);
    });

    it("handlerSteppers are disabled when pagecount == 0", () => {
        const wrapper = mount(main);
        const instance = wrapper.find(Main.WrappedComponent).instance();
        const m = jest.spyOn(instance, "handleStepperNext");
        let button = wrapper.find("#stepper-next");
        button.hostNodes().at(0).simulate('click');
        expect(m).toHaveBeenCalledTimes(0);
        button = wrapper.find("#stepper-back");
        button.hostNodes().at(0).simulate('click');
        expect(m).toHaveBeenCalledTimes(0);
    });

    it("should call handlerStepperNext/Back ", () => {
        main = (
            <Provider store={fullStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Main} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const spyFollow = jest
            .spyOn(actionCreators, "followQuestion")
            .mockImplementation(path => {
                return dispatch => {};
            });
        const wrapper = mount(main);
        const instance = wrapper.find(Main.WrappedComponent).instance();
        let button = wrapper.find("#stepper-next");
        button.hostNodes().at(0).simulate('click');
        expect(instance.state['activeStep']).toEqual(1);
        button = wrapper.find("#stepper-back");
        button.hostNodes().at(0).simulate('click');
        expect(instance.state['activeStep']).toEqual(0);
    });

    it("should call not handlerStepperPrev when at first page", () => {
        const spyFollow = jest
            .spyOn(actionCreators, "followQuestion")
            .mockImplementation(path => {
                return dispatch => {};
            });
        const wrapper = mount(main);
        const instance = wrapper.find(Main.WrappedComponent).instance();
        const m = jest.spyOn(instance, "handleStepperBack");
        let button = wrapper.find("#stepper-back");
        button.hostNodes().at(0).simulate('click');
        expect(m).toHaveBeenCalledTimes(0);
    });

  it("should toggle between answer/question list ", () => {
        const spyFollow = jest
            .spyOn(actionCreators, "followQuestion")
            .mockImplementation(path => {
                return dispatch => {};
            });
        const wrapper = mount(main);
        const instance = wrapper.find(Main.WrappedComponent).instance();
        const m = jest.spyOn(instance, "clickTabHandler");
        let button = wrapper.find("#toggle");
        button.hostNodes().at(0).simulate('click'); // shows answer page
        expect(instance.state['isQuestionTab']).toEqual(false);
        button.hostNodes().at(0).simulate('click'); // shows questions page
        expect(instance.state['isQuestionTab']).toEqual(true);
        expect(m).toHaveBeenCalledTimes(2);
    });
});
