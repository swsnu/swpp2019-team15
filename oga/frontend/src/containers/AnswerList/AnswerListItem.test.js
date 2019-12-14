import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import AnswerListItem from "./AnswerListItem";
import { history } from "../../store/store";
import * as answerActions from "../../store/actions/answerActions";
import * as questionActions from "../../store/actions/questionActions";
import * as authActions from "../../store/actions/authActions";
import AnswerView from "../../components/AnswerView/AnswerView";

console.error = jest.fn();
jest.mock("../../components/AnswerView/AnswerView.js", () => {
    return jest.fn(props => {
        return <div className="spyAnswer"></div>;
    });
});
const spyGetAnswer = jest
    .spyOn(authActions, "isLoggedIn")
    .mockImplementation(() => {
        return dispatch => {};
    });

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    question: {
        selectedQuestion: {
            content: "MANY SEATS",
            id: 1,
            target_location_name: "HOME"
        },
        user_name: null,
        targetLocation: null,
        questions: []
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
                user_disliked: false,
                user_liked: false,
            }
        ]
    },
    router: history,
    auth: { authenticated: false },
});

describe("<AnswerList />", () => {
    let item;
    let spyHistoryPush;

    let answers = [
        {
            id: 1,
            author: "me",
            question_type: "MANY SEATS",
            publish_date_time: "2019-01-01 00:00:00",
            place_name: "HOME",
            rated_up: 0,
            rated_down: 0,
        }
    ];
    beforeEach(() => {
        item = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                      <Route path="/"
                        exact
                        render={() => <AnswerListItem selectedAnswers={answers}/>} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render AnswerListItem", () => {
        const component = mount(item);
        const wrapper = component.find("#answer_item");
        expect(wrapper.length).toBe(1);
    });

    it("should call clickAuthor upon clicking author", () => {
        const component = mount(item);
        const instance = component.find(AnswerListItem.WrappedComponent).instance();
        const m = jest.spyOn(instance, "clickAuthor");
        const wrapper = component.find("#answer_item");
        wrapper.props().clickAuthor();
        expect(m).toHaveBeenCalledTimes(1);
        expect(m).toHaveBeenCalledWith("me");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledWith("/profile/me");
    });

    it("should call rateUp upon clicking rateUp", () => {
        let spyRateUp = jest
            .spyOn(answerActions, "rateUp")
            .mockImplementation(() => {
                return dispatch => {}; });
        const component = mount(item);
        const instance = component.find(AnswerListItem.WrappedComponent).instance();
        const wrapper = component.find("#answer_item");
        wrapper.props().rateUp();
        expect(spyRateUp).toHaveBeenCalledTimes(1);
    });

    it("should call rateDown upon clicking rateUp", () => {
        let spyRateDown = jest
            .spyOn(answerActions, "rateDown")
            .mockImplementation(() => {
                return dispatch => {}; });
        const component = mount(item);
        const instance = component.find(AnswerListItem.WrappedComponent).instance();
        const wrapper = component.find("#answer_item");
        wrapper.props().rateDown();
        expect(spyRateDown).toHaveBeenCalledTimes(1);
    });

    it("should go to answer details upon click", () => {
        const component = mount(item);
        const instance = component.find(AnswerListItem.WrappedComponent).instance();
        const wrapper = component.find("#answer_item");
        wrapper.props().clickAnswer();
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
        expect(spyHistoryPush).toHaveBeenCalledWith("/reply/1");
    });
});
