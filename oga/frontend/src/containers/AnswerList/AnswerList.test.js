import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import AnswerList from "./AnswerList";
import { history } from "../../store/store";
import * as answerActions from "../../store/actions/answerActions";
import * as questionActions from "../../store/actions/questionActions";
import * as authActions from "../../store/actions/authActions";

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
                author: "me",
                question_type: "MANY SEATS",
                publish_date_time: "2019-01-01 00:00:00",
                place_name: "HOME"
            }
        ]
    },
    auth: { authenticated: false },
    router: history
});

describe("<AnswerList />", () => {
    let answerList;
    let spyGetAnswers;
    let spyGetQuestion;

    beforeEach(() => {
        answerList = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact render={() => <AnswerList />} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyGetQuestion = jest
            .spyOn(questionActions, "getQuestion")
            .mockImplementation(id => {
                return dispatch => {};
            });
        spyGetAnswers = jest
            .spyOn(answerActions, "getAnswers")
            .mockImplementation(id => {
                return dispatch => {};
            });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render AnswerList", () => {
        const component = mount(answerList);
        const wrapper = component.find(".spyAnswer");
        expect(wrapper.length).toBe(1);
        expect(spyGetAnswers).toBeCalledTimes(1);
        expect(spyGetQuestion).toBeCalledTimes(1);
    });

    it("should redirect to /ask when clicking NewQuestion", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const component = mount(answerList);
        const wrapper = component.find("#question-create-button");
        wrapper.hostNodes().simulate("click");
        expect(spyHistoryPush).toBeCalledTimes(1);
        expect(spyHistoryPush).toBeCalledWith("/ask");
    });

    it("should redirect to /reply/create/:id when clicking NewQuestion", () => {
        const spyHistoryPush = jest
            .spyOn(history, "push")
            .mockImplementation(path => {});
        const component = mount(answerList);
        component.setProps({ match: { params: { id: 1 } } });
        const wrapper = component.find("#reply-create-button");
        wrapper.hostNodes().simulate("click");
        expect(spyHistoryPush).toBeCalledTimes(1);
        //expect(spyHistoryPush).toBeCalledWith("/reply/create/1");
    });

    it("should go back when clicking goBack", () => {
        const spyHistoryBack = jest
            .spyOn(history, "goBack")
            .mockImplementation(path => {});
        const component = mount(answerList);
        const wrapper = component.find("#back-button");
        wrapper.hostNodes().simulate("click");
        expect(spyHistoryBack).toBeCalledTimes(1);
        //expect(spyHistoryPush).toBeCalledWith("/reply/create/1");
    });

    it("should render nothing when props are not loaded", () => {
        const store = mockStore({
            question: {
                selectedQuestion: null,
                user_name: null,
                targetLocation: null,
                questions: []
            },
            answer: {
                answers: [
                    {
                        id: 1,
                        author: "me",
                        question_type: "MANY SEATS",
                        publish_date_time: "2019-01-01 00:00:00",
                        place_name: "HOME"
                    }
                ]
            },
            router: history,
            auth: { authenticated: false },
        });
        let answerList = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact render={() => <AnswerList />} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        const spyHistoryBack = jest
            .spyOn(history, "goBack")
            .mockImplementation(path => {});
        const component = mount(answerList);
        const wrapper = component.find("#back-button");
        wrapper.hostNodes().simulate("click");
        expect(spyHistoryBack).toBeCalledTimes(1);
        //expect(spyHistoryPush).toBeCalledWith("/reply/create/1");
    });
});
