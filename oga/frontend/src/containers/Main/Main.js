import React, { Component } from "react";

import Question from "../../components/Question/Question";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";

import * as actionCreators from "../../store/actions/index";
import PushNotification from "../../components/PushNotification/PushNotification";

//Material UI imports
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";

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
        var stored_Questions = this.props.storedQuestions.slice(len - 10, len);
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
            <div
                className="Main"
                // style={{ backgroundColor: "#fff", color: "#000" }}
            >
                <Container component="main">
                    <CssBaseline />
                    <Box pt={8} />
                    <Typography component="h1" variant="h3">
                        Question Feed
                    </Typography>
                    <Box pt={5} />
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        {Questions}
                    </Grid>
                    <IconButton
                        color="primary"
                        id="question-create-button"
                        variant="contained"
                        onClick={() => this.clickNewQuestionHandler()}
                    >
                        <AddCircleTwoToneIcon />
                    </IconButton>
                    <Grid container justify="center" alignItems="center">
                        <Button
                            id="back-button"
                            color="primary"
                            onClick={() => this.props.history.goBack()}
                        >
                            Back
                        </Button>
                        <Button
                            id="settings-button"
                            color="primary"
                            onClick={() => this.props.history.push("/settings")}
                        >
                            Settings
                        </Button>
                    </Grid>
                    <Box pt={5} />
                </Container>
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
