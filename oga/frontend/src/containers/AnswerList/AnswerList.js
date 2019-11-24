import React, { Component } from "react";
import "./AnswerList.css";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/";

import moment from "moment";
import AnswerView from "../../components/AnswerView/AnswerView";

//Material UI imports
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";

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
                    />
                </React.Fragment>
            );
            var len = this.props.selectedAnswers.length;
            var selected_Answers = this.props.selectedAnswers.slice(
                len - 10,
                len
            );
            answers = selected_Answers.map(ans => {
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
                    />
                );
            });

        }

        return (
            <div className="AnswerList">
                <Container component="main">
                    <CssBaseline />
                    <Box pt={5} />
                    <Typography component="h1" variant="h5" color="primary">
                        Selected question
                    </Typography>
                    <Box pt={2} />
                    <Typography component="h3" variant="h4" align="center">
                        {gotten_answer_view}
                    </Typography>
                    <Box pt={5} />
                    <Typography component="h1" variant="h5" color="primary">
                        Answers to this question
                    </Typography>
                    <Box pt={2} />
                    <Grid container spacing={2} direction="row">
                        {answers}
                    </Grid>
                    <Box pt={3} />
                    <Grid container justify="center" alignItems="center">
                        <Button
                            variant="contained"
                            id="reply-create-button"
                            color="primary"
                            onClick={() =>
                                this.clickAnswerHandler(this.state.id)
                            }
                        >
                            Reply to this question!
                        </Button>
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
                    </Grid>
                    <Box pt={10} />
                </Container>
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
