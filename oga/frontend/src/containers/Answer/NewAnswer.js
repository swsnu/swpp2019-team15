import React, { Component } from "react";
import Map from "../../containers/Map/GoogleMap";
import "./NewAnswer.css";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";
import { answer_markers } from "../../const/question_type";

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
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import MicIcon from "@material-ui/icons/Mic";
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
                answered: true,
                rating: value
            });
        }
    };

    getComponent(qs_type) {
        console.log(`${this.qs_type}`);
        switch (qs_type) {
            case "Are there LONG LINES":
                return (
                    <EmojiPeopleRoundedIcon
                        fontSize="inherit"
                        style={{
                            fontSize: "55px",
                            width: "60px"
                        }}
                    />
                );
            case "Are there MANY SEATS":
                return (
                    <FavoriteIcon
                        fontSize="inherit"
                        style={{
                            fontSize: "55px",
                            width: "60px"
                        }}
                    />
                );
            case "Is it RAINING":
                return (
                    <InvertColorsIcon
                        fontSize="inherit"
                        style={{
                            fontSize: "55px",
                            width: "60px"
                        }}
                    />
                );
            // Is it quiet
            default:
                return (
                    <MicIcon
                        fontSize="inherit"
                        style={{
                            fontSize: "55px",
                            width: "60px"
                        }}
                    />
                );
        }
    }

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
                    targets={[{
                        lat: this.props.selectedQuestion.place_lat,
                        lng: this.props.selectedQuestion.place_lng,
                        loc: this.props.selectedQuestion.location,
                    }]}
                ></Map>
            );

            qs_type = this.props.selectedQuestion.content;
            answer_list = answer_markers[qs_type];

            const IconContainer = props => {
                const { value, ...other } = props;
                return (
                    <Tooltip title={answer_list[value - 1].label}>
                        <span {...other} />
                    </Tooltip>
                );
            };

            //Customized answer rating
            selected_question_type_list = (
                <StyledRating
                    id="#answer-rating"
                    max={answer_list.length}
                    precision={1}
                    icon={this.getComponent(qs_type)}
                    value={this.state.rating}
                    onChangeActive={(event, value) =>
                        this.onChangeHandler(event, value)
                    }
                    IconContainerComponent={IconContainer}
                />
            );

            gotten_answer_view = (
                <React.Fragment>
                    {this.props.selectedQuestion.content} in{" "}
                    {this.props.selectedQuestion.target_location_name}?
                </React.Fragment>
            );
        }

        return (
            <Grid container className="Answer" direction="row">
                <Grid item md={6} xs={12}>
                    {map}
                </Grid>
                <Grid
                    md={6}
                    xs={12}
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
