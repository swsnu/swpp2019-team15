import React, { Component } from "react";
import Map from "../../containers/Map/GoogleMap";
import "./NewAnswer.css";

import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/";

import AnswerView from "../../components/AnswerView/AnswerView";
import { question_types, answer_markers } from "../../const/question_type";

//Material design imports
import {
    Box,
    Button,
    Grid,
    Slider,
    Tooltip,
    Typography,
    Card,
    Paper
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import MicIcon from "@material-ui/icons/Mic";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import Rating from "@material-ui/lab/Rating";
import StyledRating from "../../components/MuiStyle/CustomRating";
class NewAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer_content: "No answer",
            answered: false,
            rating: 0,
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.props.onGetQuestion(this.state.id);
    }

    postAnswerHandler = (question_content, answer_content, id) => {
        if (this.state.answered) {
            // for testing purposes, we set type to 0, and pass content as well
            // actually, we only have to store type in questions,
            // as content is fixed based on type
            this.props.createAnswer(question_content, answer_content, id);
        }
    };

    onChangeHandler = (event, value, answer_list) => {
        console.log(`value is ${value}`);
        if (value > 0) {
            this.setState({
                answer_content:
                    answer_markers[this.props.selectedQuestion.content][
                        value - 1
                    ].content,
                // answer_list[answer_list.findIndex(mark => mark.value === value)]
                //     .content,
                answered: true,
                rating: value
            });
        }
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
            // qs_type = question_types[qs_type];

            const IconContainer = props => {
                const { value, ...other } = props;
                return (
                    <Tooltip title={answer_list[value - 1].label}>
                        <span {...other} />
                    </Tooltip>
                );
            };

            selected_question_type_list = (
                <StyledRating
                    id="#answer-rating"
                    max={answer_list.length}
                    precision={1}
                    icon={
                        <PersonIcon
                            fontSize="inherit"
                            style={{
                                fontSize: "55px",
                                width: "60px"
                            }}
                        />
                    }
                    value={this.state.rating}
                    onChangeActive={(event, value) =>
                        this.onChangeHandler(event, value)
                    }
                    IconContainerComponent={IconContainer}
                />
                // <Slider
                //     id="#slider"
                //     style={{
                //         marginTop: 50,
                //         marginBottom: 50,
                //         width: "70%"
                //     }}
                //     defaultValue={1}
                //     aria-labelledby="answer-choices"
                //     track={false}
                //     min={1}
                //     max={answer_list.length}
                //     step={null}
                //     marks={answer_list}
                //     valueLabelDisplay="auto"
                //     onChange={(event, value) =>
                //         this.onChangeHandler(event, value, answer_list)
                //     }
                // />
            );

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
                <Grid
                    md={6}
                    alignItems="center"
                    justify="center"
                    style={{ padding: 40 }}
                >
                    <Box pt={5} />
                    <Typography variant="h4">{gotten_answer_view}</Typography>
                    <Box pt={10} />
                    <Typography variant="h5" color="primary">
                        Answer a Question!
                    </Typography>
                    <Box pt={3} />
                    <Typography variant="h4">
                        {this.state.answer_content}
                    </Typography>
                    <Box pt={5} />
                    <div id="answer-choices">{selected_question_type_list}</div>
                    <Box pt={6} />
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
