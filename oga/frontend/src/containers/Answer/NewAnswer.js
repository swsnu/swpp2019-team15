import React, { Component } from "react";
import "./NewAnswer.css";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";

import AnswerView from "../../components/AnswerView/AnswerView";
import { question_types } from "../../const/question_type";

//Material design imports
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

class NewAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer_content: null,
            answered: false,
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.props.onGetQuestion(this.state.id);
    }

    postAnswerHandler = (question_content, answer_content, id) => {
        // console.log(this.state.answer_content)
        // console.log(this.state.answered)
        // console.log(this.props.selectedQuestion.content)
        if (this.state.answered) {
            // for testing purposes, we set type to 0, and pass content as well
            // actually, we only have to store type in questions,
            // as content is fixed based on type
            this.props.createAnswer(question_content, answer_content, id);
        }
    };

    clickBackHandler = () => {
        this.props.history.goBack();
    };

    render() {
        var selected_question_type = null;
        var selected_question_type_list = null;
        var qs_type = "";
        var idx = 0;
        let gotten_answer_view = null;
        if (this.props.selectedQuestion) {
            qs_type = this.props.selectedQuestion.content;
            qs_type = question_types[qs_type];
            selected_question_type_list = qs_type.map((val, index) => {
                return (
                    <div className={"choice"} key={idx++}>
                        <label>{val}</label>
                        <input type="radio" value={val} name="answer" />
                    </div>
                );
            });

            gotten_answer_view = (
                <React.Fragment>
                    <AnswerView
                        //key={this.props.selectedQuestion.id}
                        id={this.props.selectedQuestion.id}
                        content={this.props.selectedQuestion.content}
                        place_name={
                            this.props.selectedQuestion.target_location_name
                        }
                        is_answered={false}
                    />
                </React.Fragment>
            );
        }

        return (
            <div
                className="Answer"
                style={{ backgroundColor: "#ffe6cc", color: "#000" }}
            >
                <CssBaseline />
                <Box pt={15} />
                <Typography component="h2" variant="h3">
                    Answer a Question!
                </Typography>
                <Box pt={10} />
                <Typography component="h3" variant="h5">
                    {gotten_answer_view}
                </Typography>

                <div>
                    <div
                        id="answer-choices"
                        onChange={event =>
                            this.setState({
                                answer_content: event.target.value,
                                answered: true
                            })
                        }
                    >
                        {selected_question_type_list}
                    </div>
                </div>
                <Box pt={10} />
                <Button
                    color="secondary"
                    type="submit"
                    id="confirm-create-answer-button"
                    variant="contained"
                    onClick={() =>
                        this.postAnswerHandler(
                            this.props.selectedQuestion.content,
                            this.state.answer_content,
                            this.props.match.params.id
                        )
                    }
                >
                    Submit
                </Button>
                <Grid container justify="center" alignItems="center">
                    <Button
                        id="back-create-answer-button"
                        color="secondary"
                        onClick={() => this.clickBackHandler()}
                    >
                        Back
                    </Button>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedQuestion: state.question.selectedQuestion
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetQuestion: id => dispatch(actionCreators.getQuestion(id)),
        createAnswer: (question_type, answer_content, id) =>
            dispatch(
                actionCreators.createAnswer(
                    {
                        question_type: question_type,
                        answer_content: answer_content
                    },
                    id
                )
            )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewAnswer);
