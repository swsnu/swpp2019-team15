import React, { Component } from "react";

import "./RealDetail.css";

import { connect } from "react-redux";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

class RealDetail extends Component {
    componentDidMount() {
        this.props.onGetQuestion(this.props.match.params.id);
        //if (!this.props.log_status) {
        //this.props.history.push('/login');
        //}
    }

    render() {
        let title = "";
        let content = "";
        if (this.props.selectedQuestion) {
            title = this.props.selectedQuestion.title;
            content = this.props.selectedQuestion.content;
        }
        return (
            <div className="RealDetail">
                <div className="row">
                    <div className="left">Name:</div>
                    <div className="right">{title}</div>
                </div>
                <div className="row">
                    <div className="left">Content:</div>
                    <div className="right">{content}</div>
                </div>
                <button
                    id="logout-button"
                    onClick={() => this.props.setLogout()}
                >
                    Log-out
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedQuestion: state.question.selectedQuestion
        //log_status: state.rd.log_status,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //onGetQuestion: id =>
        //dispatch(actionCreators.getQuestion(id)),
        //setLogout: () =>
        //dispatch(actionCreators.settingLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RealDetail);
