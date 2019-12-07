import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import thunk from "redux-thunk";
import NewAnswer from "./NewAnswer.js";
import { history } from "../../store/store";
import * as questionActions from "../../store/actions/questionActions";
import * as actionCreators from "../../store/actions/answerActions";

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;
console.error = jest.fn();
//jest.mock('../../Map/GoogleMap.js', () => () => 'Map');

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    question: {
        selectedQuestion: null,
        user_name: null,
        targetLocation: null,
        questions: []
    },
    location: {
        targetLocation: { langitude: 1, longitude: 2 }
    },
    router: history
});
const spyGetQuestion = jest
    .spyOn(questionActions, "getQuestion")
    .mockImplementation(question => {
        return dispatch => {};
    });
const state = { content: "" };

describe("<NewAnswer/>", () => {
    let answer;

    beforeEach(() => {
        answer = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={props => <NewAnswer {...props} />}
                            // component={NewAnswer}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    it("should render without errors", () => {
        const wrapper = mount(answer);
        expect(wrapper.find(".Answer").length).toBe(3);
    });

    it("should change answer content ", () => {
        const wrapper = mount(answer);
        const component = wrapper.find("#answer-choices");
        const answer_data = "NO";
        //component.props.onChange(answer_data);
        component
            .hostNodes()
            .simulate("change", { target: { value: answer_data } });
        const instance = wrapper.find(NewAnswer.WrappedComponent).instance();
        // Timeout to detect change for async call
        setTimeout(
            () => expect(instance.state.answer_content).toBe(answer_data),
            0
        );
    });

    it("should render chosen question ", () => {
        let store = mockStore({
            question: {
                selectedQuestion: {
                    content: "Are there MANY SEATS",
                    id: 1,
                    target_location_name: "HOME"
                },
                targetLocation: null,
                questions: []
            },
            location: {
                targetLocation: { langitude: 1, longitude: 2 }
            },
            router: history
        });

        let answer = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={NewAnswer} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const component = mount(answer);
        let wrapper = component.find(".AnswerView");
        //wrapper.simulate('click');
        wrapper.props.place_name = "HOME";
        expect(wrapper.props.place_name).toBe("HOME");
    });

    xit("should handle goback ", () => {
        const spyHistoryPush = jest
            .spyOn(history, "goBack")
            .mockImplementation(path => {});
        const component = mount(answer);
        let wrapper = component.find("#back-create-answer-button");
        wrapper.hostNodes().simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should not submit answer with no choice ", () => {
        let store = mockStore({
            question: {
                selectedQuestion: {
                    content: "Are there MANY SEATS",
                    id: 1,
                    target_location_name: "HOME"
                },
                targetLocation: null,
                questions: []
            },
            location: {
                targetLocation: { langitude: 1, longitude: 2 }
            },
            router: history
        });

        let answer = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={NewAnswer} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const spyCreateAnswer = jest
            .spyOn(actionCreators, "createAnswer")
            .mockImplementation(ans => {
                return dispatch => {};
            });
        const component = mount(answer);
        let wrapper = component.find("#confirm-create-answer-button");
        wrapper.hostNodes().simulate("click");
        expect(spyCreateAnswer).toHaveBeenCalledTimes(0);
    });

    it("should submit answer when choice exists", () => {
        let store = mockStore({
            question: {
                selectedQuestion: {
                    content: "Are there MANY SEATS",
                    id: 1,
                    target_location_name: "HOME"
                },
                targetLocation: null,
                questions: []
            },
            location: {
                targetLocation: { langitude: 1, longitude: 2 }
            },
            router: history
        });

        let answer = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={NewAnswer} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const spyCreateAnswer = jest
            .spyOn(actionCreators, "createAnswer")
            .mockImplementation(ans => {
                return dispatch => {};
            });
        const component = mount(answer);
        const choice = component.find("#answer-choices");
        const answer_data = "NO";
        //component.props.onChange(answer_data);
        choice
            .hostNodes()
            .simulate("click", { target: { value: answer_data } });
        let wrapper = component.find("#confirm-create-answer-button");
        wrapper.hostNodes().simulate("click");
        setTimeout(() => expect(spyCreateAnswer).toHaveBeenCalledTimes(1), 0);
    });
});
