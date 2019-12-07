import React, { Component } from "react";
import Map from "../../containers/Map/GoogleMap";
import "./NewAnswer.css";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";

import AnswerView from "../../components/AnswerView/AnswerView";
import { question_types, answer_markers } from "../../const/question_type";

//Material design imports
import { Box, Button, Grid, Slider, Typography } from "@material-ui/core";

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
        var selected_question_type_list = null;
        var qs_type = "";
        var answer_list = null;
        var idx = 0;
        let gotten_answer_view = null;
        var map = null;
        if (this.props.selectedQuestion) {
            map = (
                <Map
                    viewOnly={true}
                    target={{
                        lat: this.props.selectedQuestion.place_lat,
                        lng: this.props.selectedQuestion.place_lng
                    }}
                ></Map>
            );

            qs_type = this.props.selectedQuestion.content;
            answer_list = answer_markers[qs_type];
            qs_type = question_types[qs_type];
            console.log(`Answer list is ${answer_list.length} long`);

            selected_question_type_list = (
                <Slider
                    style={{
                        marginTop: 50,
                        marginBottom: 50,
                        width: "70%"
                    }}
                    defaultValue={0}
                    getAriaValueText={value => {
                        return `${value}%`;
                    }}
                    aria-labelledby="answer-choices"
                    track={false}
                    min={1}
                    max={answer_list.length}
                    step={null}
                    marks={answer_list}
                    valueLabelDisplay="auto"
                    onChange={(event, value) =>
                        this.setState({
                            answer_content:
                                answer_list[
                                    answer_list.findIndex(
                                        mark => mark.value === value
                                    )
                                ].label,
                            answered: true
                        })
                    }
                />
            );
            // selected_question_type_list = qs_type.map((val, index) => {
            //     return (
            //         <div className={"choice"} key={idx++}>
            //             <label>{val}</label>
            //             <input type="radio" value={val} name="answer" />

            //         </div>
            //     );
            // });

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
        }

        return (
            <Grid container className="Answer" direction="row">
                <Grid item md={6}>
                    {map}
                </Grid>
                <Grid item md={6}>
                    <Box pt={10} />
                    <Typography variant="h5" color="primary">
                        Answer a Question!
                    </Typography>
                    <Box pt={8} />
                    <Typography variant="h5">{gotten_answer_view}</Typography>
                    {selected_question_type_list}
                    <Box pt={10} />
                    <Button
                        color="primary"
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
                </Grid>
            </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewAnswer);
