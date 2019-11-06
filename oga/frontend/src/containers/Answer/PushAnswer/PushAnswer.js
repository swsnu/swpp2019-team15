import React, { Component } from "react";
import "./PushAnswer.css";
import AnswerView from "../../../components/AnswerView/AnswerView";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../../store/actions";

class PushAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.props.onGetAnswer(this.state.id);
    }

    render() {
        var answer = null;
        if (this.props.selectedAnswer) {
            answer = (
                <React.Fragment>
                    <AnswerView
                        key={this.props.selectedAnswer.id}
                        id={this.props.selectedAnswer.id}
                        author={this.props.selectedAnswer.author}
                        content={this.props.selectedAnswer.question_type}
                        publish_date_time={
                            this.props.selectedAnswer.publish_date_time
                        }
                        answer_content={this.props.selectedAnswer.content}
                        place_name={this.props.selectedAnswer.place_name}
                        is_answered={true}
                    />
                </React.Fragment>
            );
        }

        return (
            <div className="PushAnswer">
                <h1>You got this answer!</h1>
                {answer}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedAnswer: state.answer.answer
        //log_status: state.rd.log_status,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAnswer: id => dispatch(actionCreators.getAnswer(id))
        //setLogout: () =>
        //dispatch(actionCreators.settingLogout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PushAnswer));
