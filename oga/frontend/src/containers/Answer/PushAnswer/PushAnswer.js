import React, { Component } from "react";
import "./PushAnswer.css";
import AnswerView from "../../../components/AnswerView/AnswerView";
import Map from "../../Map/GoogleMap";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../../store/actions";
import moment from "moment";

// Material UI imports
import {
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    CardHeader
} from "@material-ui/core";
import { answer_types } from "../../../const/question_type";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

class PushAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.props.onGetAnswer(this.state.id);
    }

    getRecommendationsHandler = () => {
        let answer = this.props.selectedAnswer;
        // Check if answer to question is negative
        if (answer_types[answer.content] == 0) {
            // get recommendations for answered question

            this.props.onGetRecommendations(
                this.props.selectedAnswer.question_id
            );
        }
    };

    render() {
        var answer = null;
        if (this.props.selectedAnswer) {
            var recommendations = null;

            var answer = this.props.selectedAnswer;
            // Check if answer to question is negative
            if (answer_types[answer.content] == 0) {
                console.log(
                    `${answer.content}: ${answer_types[answer.content]}`
                );
                // get recommendations for answered question
                this.props.onGetRecommendations(answer.question_id);
                if (
                    this.props.recommendations &&
                    this.props.recommendations.length > 0
                ) {
                    recommendations = [];
                    // Store recommended locations in recommendation list
                    for (
                        var i = 0;
                        i < this.props.recommendations.length;
                        i++
                    ) {
                        recommendations.push(
                            <div key={i}>
                                <Typography variant="h6" gutterBottom>
                                    <RoomRoundedIcon />
                                    {"  "}
                                    {this.props.recommendations[i]}
                                </Typography>
                            </div>
                        );
                    }
                }
            }

            answer = (
                <Grid container direction="row">
                    <Grid item md={6} xs={12}>
                        <Map
                            viewOnly={true}
                            target={{
                                lat: this.props.selectedAnswer.place_lat,
                                lng: this.props.selectedAnswer.place_lng
                            }}
                        ></Map>
                    </Grid>
                    <Grid item style={{ padding: 30 }} md={6} xs={12}>
                        <Box pt={5} />
                        <Grid>
                            <AnswerView
                                key={this.props.selectedAnswer.id}
                                id={this.props.selectedAnswer.id}
                                showQuestion={true}
                                clickQuestion={() =>
                                    this.props.history.push(
                                        "/replies/" +
                                            this.props.selectedAnswer
                                                .question_id
                                    )
                                }
                                author={this.props.selectedAnswer.author}
                                publish_date_time={moment(
                                    this.props.publish_date_time
                                ).format("MMMM Do YYYY, h:mm:ss a")}
                                answer_content={
                                    this.props.selectedAnswer.content
                                }
                                content={
                                    this.props.selectedAnswer.question_type
                                }
                                place_name={this.props.selectedAnswer.location}
                                disableLike={
                                    this.props.selectedAnswer.user_liked
                                }
                                disableDislike={
                                    this.props.selectedAnswer.user_disliked
                                }
                                rateUpCount={this.props.selectedAnswer.upvotes}
                                rateDownCount={
                                    this.props.selectedAnswer.downvotes
                                }
                                clickAuthor={() =>
                                    this.props.history.push(
                                        "/profile/" +
                                            this.props.selectedAnswer.author
                                    )
                                }
                            />
                        </Grid>
                        <Box pt={5} />
                        {recommendations && (
                            <Card>
                                <CardHeader
                                    color="primary"
                                    style={{
                                        backgroundColor: "#cde5f7"
                                    }}
                                    title={
                                        <Typography
                                            variant="h6"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Why don't you try somewhere else
                                            instead?
                                        </Typography>
                                    }
                                ></CardHeader>
                                <CardContent
                                    style={{
                                        paddingTop: 50,
                                        paddingBottom: 50
                                    }}
                                >
                                    {recommendations}
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            );
        }
        return <div className="PushAnswer">{answer}</div>;
    }
}

const mapStateToProps = state => {
    return {
        selectedAnswer: state.answer.answer,
        recommendations: state.question.recommendations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAnswer: id => dispatch(actionCreators.getAnswer(id)),
        onGetRecommendations: id =>
            dispatch(actionCreators.getQuestionRecommendation(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PushAnswer));
