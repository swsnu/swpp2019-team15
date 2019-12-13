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
    MobileStepper,
    Typography
} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import AnswerListItem from "../AnswerList/AnswerListItem";
class QuestionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isQuestionTab: true,
            activeStep: 0
        };
    }

    componentDidMount() {
        // Fetch list of Q&A's in a given range based on current page
        // this.props.isLoggedIn();
        this.props.onGetAllQuestions();
        this.props.onGetAllAnswers();
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

    // Switch between Question and Answer tabs
    clickTabHandler = () => {
        this.setState({
            isQuestionTab: !this.state.isQuestionTab,
            // reset to first page
            activeStep: 0
        });
    };

    // Stepper handlers for controlling page navigation
    handleStepperNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 });
    };

    handleStepperBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 });
    };

    handleStepperReset = () => {
        this.setState({ activeStep: 0 });
    };

    render() {
        console.log(this.props.auth)
        var question_len = this.props.storedQuestions.length;
        var answer_len = this.props.storedAnswers.length;
        var title = this.state.isQuestionTab ? "Question" : "Answer"

        // Limit to displaying only 10 most recent questions
        var stored_Questions = this.props.storedQuestions.slice(
            this.state.activeStep * 10,
            (this.state.activeStep + 1) * 10
        );

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

        const Answers = (
            <AnswerListItem
                selectedAnswers={this.props.storedAnswers.slice(
                    this.state.activeStep * 10,
                    (this.state.activeStep + 1) * 10
                )}
            />
        );

        var pageCount = this.state.isQuestionTab
            ? Math.round(question_len / 10, 0)
            : Math.round(answer_len / 10, 0);

        const MyStepper = (
            <MobileStepper
                steps={pageCount+1}
                position="static"
                variant="text"
                activeStep={this.state.activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={() => this.handleStepperNext()}
                        disabled={this.state.activeStep === pageCount}
                    >
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={() => this.handleStepperBack()}
                        disabled={this.state.activeStep === 0}
                    >
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
        );

        return (
            <div className="Main">
                <Box pt={8} />
                <Typography component="h1" variant="h3">
                    {title} Feed
                </Typography>
                <Button onClick={() => this.clickTabHandler()}>
                    Toggle
                </Button>
                <Box pt={5} />

                <Container component="main" justify="center">
                    {MyStepper}
                    <Grid container spacing={2} direction="row">
                        {this.state.isQuestionTab ? Questions : Answers}
                    </Grid>
                    {MyStepper}
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
        storedQuestions: state.question.questions,
        storedAnswers: state.answer.answers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAllQuestions: () => dispatch(actionCreators.getQuestions()),
        onGetAllAnswers: () => dispatch(actionCreators.getAllAnswers()),
        onFollow: id => dispatch(actionCreators.followQuestion(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(QuestionList));