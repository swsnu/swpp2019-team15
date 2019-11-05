import React, { Component } from "react";

import Question from "../../components/Question/Question";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";

import * as actionCreators from "../../store/actions/index";
import PushNotification from "../../components/PushNotification/PushNotification";

//Material UI imports
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

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

    click;
    render() {
        const Questions = this.props.storedQuestions.map(qs => {
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box pt={15} />
                <Typography component="h1" variant="h5">
                    Question Feed
                </Typography>
                <GridList spacing={15} cellHeight={400}>
                    <GridListTile cols={1}>{Questions}</GridListTile>
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
                        <PushNotification />
                    </div>
                </GridList>
            </Container>
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
