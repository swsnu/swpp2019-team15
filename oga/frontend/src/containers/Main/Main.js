import React, { Component } from "react";

import Question from "../../components/Question/Question";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";
import "./Main.css";
import * as actionCreators from "../../store/actions/index";

//Material UI imports
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Typography
} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
class QuestionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isQuestionTab: false
        };
    }

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

    clickAuthorHandler = author => {
        this.props.history.push("/profile/" + author);
    };

    clickTabHandler = val => {
        this.setState({
            isQuestionTab: val
        });
    };

    render() {
        var len = this.props.storedQuestions.length;
        // Limit to displaying only 50 most recent questions
        var stored_Questions = this.props.storedQuestions.slice(0, 50);
        const Questions = stored_Questions.map(qs => {
            return (
                <Grid item xs={6} key={qs.id}>
                    <Question
                        key={qs.id}
                        id={qs.id}
                        author={qs.author}
                        publish_date_time={moment(qs.publish_date_time).format(
                            "MMMM Do YYYY, h:mm:ss a"
                        )}
                        content={qs.content}
                        answer_count={qs.answer_count}
                        follow_count={qs.follow_count}
                        location={qs.location}
                        is_answered={qs.is_answered}
                        showButtons={true}
                        clickAnswer={() => this.clickAnswerHandler(qs)}
                        clickFollow={() => this.clickFollowHandler(qs)}
                        clickDetail={() => this.clickDetailHandler(qs)}
                        clickAuthor={() => this.clickAuthorHandler(qs.author)}
                    />
                </Grid>
            );
        });

        return (
            <div className="Main">
                <Box pt={8} />
                <Typography component="h1" variant="h3">
                    Question Feed
                </Typography>
                <Box pt={5} />
                <Container component="main" justify="center">
                    <Grid container spacing={2} direction="row">
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
