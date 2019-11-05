import React, { Component } from "react";
import "./AnswerList.css";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import thunk from "redux-thunk";
import * as actionCreators from "../../store/actions/";

import { Redirect } from "react-router-dom";
import { push } from "connected-react-router";
import moment from "moment";
import AnswerView from "../../components/AnswerView/AnswerView";

class AnswerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.props.onGetQuestion(this.state.id);
        this.props.onGetAnswers(this.state.id);
    }

    clickNewQuestionHandler = () => {
        this.props.history.push("/ask");
    };

    clickAnswerHandler = id => {
        this.props.history.push("/reply/create/" + id);
    };

    clickBackHandler = () => {
        this.props.history.goBack();
    };

    render() {
        var gotten_answer_view = null;
        var answers = null;
        if (this.props.selectedQuestion) {
            gotten_answer_view = (
                <React.Fragment>
                    <AnswerView
                        key={this.props.selectedQuestion.id}
                        id={this.props.selectedQuestion.id}
                        content={this.props.selectedQuestion.content}
                        place_name={
                            this.props.selectedQuestion.target_location_name
                        }
                        is_answered={false}
                    ></AnswerView>
                </React.Fragment>
            );
            answers = this.props.selectedAnswers.map(ans => {
                return (
                    <AnswerView
                        key={ans.id}
                        id={ans.id}
                        author={ans.author}
                        content={ans.question_type}
                        publish_date_time={moment(ans.publish_date_time).format(
                            "MMMM Do YYYY, h:mm:ss a"
                        )}
                        answer_content={ans.content}
                        is_answered={true}
                        place_name={
                            this.props.selectedQuestion.target_location_name
                        }
                    ></AnswerView>
                );
            });
        }

        return (
            <div className="AnswerList">
                <h1>Selected question</h1>
                {gotten_answer_view}
                <h1>Answers to this question</h1>
                {answers}
                <div>
                    <button
                        id="question-create-button"
                        onClick={() => this.clickNewQuestionHandler()}
                    >
                        +
                    </button>
                </div>
                <div>
                    <button
                        id="back-button"
                        onClick={() => this.props.history.goBack()}
                    >
                        Back
                    </button>
                </div>
                <div>
                    <button
                        id="reply-create-button"
                        onClick={() => this.clickAnswerHandler(this.state.id)}
                    >
                        Reply to this question!
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedQuestion: state.question.selectedQuestion,
        selectedAnswers: state.answer.answers
        //log_status: state.rd.log_status,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetQuestion: id => dispatch(actionCreators.getQuestion(id)),
        onGetAnswers: id => dispatch(actionCreators.getAnswers(id))
        //setLogout: () =>
        //dispatch(actionCreators.settingLogout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AnswerList));
