import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";
import "./Main.css";
import * as actionCreators from "../../store/actions/index";
import GoogleMap from "../Map/GoogleMap";
import Question from "../../components/Question/Question";
import CustomToggle from "../../components/MuiStyle/CustomToggle";

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

    render() {
        var question_len = this.props.storedQuestions.length;
        var answer_len = this.props.storedAnswers.length;
        var title = this.state.isQuestionTab ? "Question" : "Answer";

        // Limit to displaying only 10 most recent questions
        var stored_Questions = this.props.storedQuestions.slice(
            this.state.activeStep * 10,
            (this.state.activeStep + 1) * 10
        );

        const Questions =
            question_len == 0
                ? null
                : stored_Questions.map(qs => {
                      return (
                          <Grid item xs={6} key={qs.id}>
                              <Question
                                  key={qs.id}
                                  id={qs.id}
                                  author={qs.author}
                                  publish_date_time={moment(
                                      qs.publish_date_time
                                  ).format("MMMM Do YYYY, h:mm:ss a")}
                                  content={qs.content}
                                  answer_count={qs.answer_count}
                                  follow_count={qs.follow_count}
                                  location={qs.location}
                                  is_answered={qs.is_answered}
                                  showButtons={true}
                                  clickAnswer={() =>
                                      this.clickAnswerHandler(qs)
                                  }
                                  clickFollow={() =>
                                      this.clickFollowHandler(qs)
                                  }
                                  clickDetail={() =>
                                      this.clickDetailHandler(qs)
                                  }
                                  clickAuthor={() =>
                                      this.clickAuthorHandler(qs.author)
                                  }
                              />
                          </Grid>
                      );
                  });

        const Answers =
            answer_len == 0 ? null : (
                <AnswerListItem
                    selectedAnswers={this.props.storedAnswers.slice(
                        this.state.activeStep * 10,
                        (this.state.activeStep + 1) * 10
                    )}
                />
            );

        var pageCount = this.state.isQuestionTab
            ? Math.ceil(question_len / 10, 1)
            : Math.ceil(answer_len / 10, 1);

        var content = this.state.isQuestionTab ? Questions : Answers;
        // console.log(content)

        // Stepper component for page navigation
        const MyStepper = (
            <MobileStepper
                steps={content == null ? 1 : pageCount}
                position="static"
                variant="text"
                activeStep={this.state.activeStep}
                nextButton={
                    <Button
                        id="stepper-next"
                        size="small"
                        onClick={() => this.handleStepperNext()}
                        disabled={
                            pageCount == 0 ||
                            this.state.activeStep === pageCount - 1
                        }
                    >
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button
                        id="stepper-back"
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
                <GoogleMap viewOnly={true} />
                <Box pt={10} />
                <Container component="main" justify="center">
                    <Typography component="h1" variant="h4">
                        {title} Feed
                    </Typography>
                    <CustomToggle
                        id="toggle"
                        checked={this.state.isQuestionTab}
                        onChange={() => this.clickTabHandler()}
                    />
                    {MyStepper}
                    <Grid container spacing={2} direction="row">
                        {content}
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
