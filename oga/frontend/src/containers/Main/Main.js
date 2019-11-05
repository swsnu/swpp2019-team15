import React, { Component } from "react";

import Question from "../../components/Question/Question";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";

import * as actionCreators from "../../store/actions/index";
import PushNotification from "../../components/PushNotification/PushNotification"

class QuestionList extends Component {
    componentDidMount() {
        this.props.onGetAll();
    }

    clickAnswerHandler = qst => {
        this.props.history.push("/reply/create/" + qst.id);
    };
    clickDetailHandler = qst => {
        this.props.history.push("/replies/" + qst.id);
    };

    clickNewQuestionHandler = () => {
        this.props.history.push("/ask");
    };

    clickFollowHandler = qst => {
        this.props.onFollow(qst.id);
    };

    render() {
        var len = this.props.storedQuestions.length;
        var stored_Questions = this.props.storedQuestions.slice(len-10, len)
        const Questions = stored_Questions.map(qs => {
            return (
                <Question
                    key={qs.id}
                    id={qs.id}
                    author={qs.author}
                    publish_date_time={moment(qs.publish_date_time).format(
                        "MMMM Do YYYY, h:mm:ss a"
                    )}
                    content={qs.content}
                    location={qs.location}
                    is_answered={qs.is_answered}
                    clickAnswer={() => this.clickAnswerHandler(qs)}
                    clickFollow={() => this.clickFollowHandler(qs)}
                    clickDetail={() => this.clickDetailHandler(qs)}
                />
            );
        });

        return (
            <div className="QuestionList">
                <h1>Question Feed</h1>
                {Questions}
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
                    <button
                        id="settings-button"
                        onClick={() => this.props.history.push("/settings")}
                    >
                        Settings
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedQuestions: state.question.questions
        //log_status: state.rd.log_status,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAll: () => dispatch(actionCreators.getQuestions()),
        onFollow: id => dispatch(actionCreators.followQuestion(id))
        //setLogout: () =>
        //dispatch(actionCreators.settingLogout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(QuestionList));
