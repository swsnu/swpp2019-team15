import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/";

import moment from "moment";

//Material UI imports
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    Typography
} from "@material-ui/core";
import AnswerListItem from "./AnswerListItem";

class AnswerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            render_check: []
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

    //clickBackHandler = () => {
    //this.props.history.goBack();
    //};

    render() {
        var gotten_answer_view = this.props.selectedQuestion;
        var question = null;
        if (gotten_answer_view) {
            question = `${this.props.selectedQuestion.content} in 
            ${this.props.selectedQuestion.target_location_name}?`;
            // gotten_answer_view = (
            //     <React.Fragment>
            //         <AnswerView
            //             key={this.props.selectedQuestion.id}
            //             id={this.props.selectedQuestion.id}
            //             content={this.props.selectedQuestion.content}
            //             place_name={
            //                 this.props.selectedQuestion.target_location_name
            //             }
            //             is_answered={false}
            //         />
            //     </React.Fragment>
            // );
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
                        {question}
                    </Typography>
                    <Box pt={5} />
                    <Typography component="h1" variant="h5" color="primary">
                        Answers to this question
                    </Typography>
                    <Box pt={2} />
                    <Grid container spacing={2} direction="row">
                        <AnswerListItem
                            selectedAnswers={this.props.selectedAnswers}
                        />
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
        selectedAnswers: state.answer.answers,
        rated_up: state.answer.rated_up,
        rated_down: state.answer.rated_down
        // numbers_rated_up: state.answer.numbers_rated_up,
        // numbers_rated_down: state.answer.numbers_rated_down,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetQuestion: id => dispatch(actionCreators.getQuestion(id)),
        onGetAnswers: id => dispatch(actionCreators.getAnswers(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AnswerList));
