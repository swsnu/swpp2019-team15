import React, { Component } from "react";
import "./PushAnswer.css";
import AnswerView from "../../../components/AnswerView/AnswerView";
import Map from "../../Map/GoogleMap";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../../store/actions";
import moment from "moment";

// Material UI imports
import { Typography, Paper, Grid, Box } from "@material-ui/core";

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

    // getRecommendationsHandler = id => {
    //     this.props.onGetRecommendations(id);
    // };

    render() {
        var answer = null;
        if (this.props.selectedAnswer) {
            this.props.onGetRecommendations(
                this.props.selectedAnswer.question_id
            );

            // this.getRecommendationsHandler(
            //     this.props.selectedAnswer.question_id
            // );
            var recommendations = "No recommendations so far";
            // (
            //     <Typography variant="h6">No recommendations so far</Typography>
            // );

            // If recommendation list isn't empty
            if (
                this.props.recommendations !== null &&
                this.props.recommendations.length > 0
            ) {
                recommendations = [];
                // Store recommended locations in recommendation list
                for (var i = 0; i < this.props.recommendations.length; i++) {
                    recommendations.push(
                        <Typography variant="h6" gutterBottom>
                            {this.props.recommendations[i]}
                        </Typography>
                    );
                }
            }
            answer = (
                <React.Fragment>
                    <Map
                        viewOnly={true}
                        target={{
                            lat: this.props.selectedAnswer.place_lat,
                            lng: this.props.selectedAnswer.place_lng
                        }}
                    ></Map>
                    <AnswerView
                        key={this.props.selectedAnswer.id}
                        id={this.props.selectedAnswer.id}
                        author={this.props.selectedAnswer.author}
                        content={this.props.selectedAnswer.question_type}
                        publish_date_time={moment(
                            this.props.publish_date_time
                        ).format("MMMM Do YYYY, h:mm:ss a")}
                        answer_content={this.props.selectedAnswer.content}
                        place_name={this.props.selectedAnswer.location}
                        is_answered={true}
                    />
                    <Paper>
                        <Grid style={{ margin: 30 }}>
                            <Typography variant="h4">
                                Recommendations for you
                            </Typography>
                            <Box pt={3} />
                            {recommendations}
                        </Grid>
                    </Paper>
                </React.Fragment>
            );
        }
        return (
            <div className="PushAnswer">
                <h1>You got this answer!</h1>
                {answer}
            </div>
        );
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
        //setLogout: () =>
        //dispatch(actionCreators.settingLogout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PushAnswer));
