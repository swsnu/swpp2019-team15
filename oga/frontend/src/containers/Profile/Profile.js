import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AnswerView from "../../components/AnswerView/AnswerView";
import moment from "moment";

import * as actionCreators from "../../store/actions/index";

//Material UI imports
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isQuestionTab: true
        };
    }

    componentDidMount() {
        this.props.getProfile();
        this.props.getUserQuestions();
        this.props.getUserAnswers();
    }

    onClickDetailHandler = id => {
        this.props.history.push("/replies/" + id);
    };

    render() {
        let username = "";
        let follows = null;
        let location = "Location unknown";
        let coordinates = "";

        if (this.props.userProfile) {
            var profile = this.props.userProfile;
            username = profile.username;
            follows = profile.follows;
            if (this.props.userProfile.location) {
                location = `${profile.location}`;
                coordinates = `(${profile.latitude}, ${profile.longitude})`;
            }
        }

        var questions = this.props.myQuestions;
        const myQuestions = questions.map(qs => {
            var time = moment(qs.publish_date_time).format(
                "MMMM Do YYYY, h:mm:ss a"
            );
            return (
                <Card className="MyQuestion" key={qs.id}>
                    <CardContent>
                        <Typography
                            id="detail-button"
                            align="left"
                            variant="subtitle1"
                            gutterBottom
                            onClick={() => this.onClickDetailHandler(qs.id)}
                        >
                            <div id="question-content">
                                Is it <b>{qs.content}</b> in{" "}
                                <b>{qs.location}</b> ?
                            </div>
                            <div id="question-publish-date-time">
                                <p>
                                    <i>
                                        {moment(
                                            time,
                                            "MMMM Do YYYY, h:mm:ss a"
                                        ).fromNow()}
                                    </i>{" "}
                                    on {time}
                                </p>
                            </div>
                            {qs.is_answered ? (
                                <div className="answered-mark">&#128525;</div>
                            ) : (
                                <div>&#128591;</div>
                            )}
                        </Typography>
                    </CardContent>
                </Card>
            );
        });

        var answers = this.props.myAnswers;
        const myAnswers = answers.map(ans => {
            var time = moment(ans.publish_date_time).format(
                "MMMM Do YYYY, h:mm:ss a"
            );

            return (
                <Card className="MyAnswer" key={ans.id}>
                    <CardContent
                        onClick={() =>
                            this.onClickDetailHandler(ans.question_id)
                        }
                    >
                        <Typography
                            color="primary"
                            align="left"
                            variant="subtitle1"
                            gutterBottom
                        >
                            <b>{ans.question_author} </b> asked{" "}
                            <i>
                                {moment(
                                    time,
                                    "MMMM Do YYYY, h:mm:ss a"
                                ).fromNow()}
                            </i>{" "}
                            on {time}
                        </Typography>
                        <Typography align="left" variant="h6" gutterBottom>
                            "For <b>{ans.question_type}</b>, it is{" "}
                            <b>{ans.content}</b> in <b>{ans.location}</b>!"
                        </Typography>
                        <Typography
                            align="left"
                            variant="subtitle2"
                            gutterBottom
                        >
                            You replied{" "}
                            <i>
                                {moment(
                                    time,
                                    "MMMM Do YYYY, h:mm:ss a"
                                ).fromNow()}
                            </i>{" "}
                            on {time}
                        </Typography>
                    </CardContent>
                </Card>
            );
        });

        return (
            <div className="Profile">
                <Grid container direction="column">
                    <Card xs={6} style={{ height: "100%", position: "fixed" }}>
                        <Box pt={3} />
                        <IconButton>
                            <Avatar
                                src="https://d.newsweek.com/en/full/1212376/detective-pikachu-trailer.png?w=1600&h=1600&q=88&f=63ca3ba60c7b46b2176de18a58d67b07"
                                style={{
                                    margin: "10px",
                                    width: "180px",
                                    height: "180px"
                                }}
                            />
                        </IconButton>
                        <Typography component="h1" variant="h4">
                            {username}
                        </Typography>
                        <Box pt={3} />
                        <Typography variant="subtitle1">
                            <i>
                                {location}
                                <br />
                                {coordinates}
                            </i>
                        </Typography>
                        <Box pt={3} />
                        <Button
                            id="main-button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => this.props.history.push("/")}
                        >
                            Main
                        </Button>
                        <Box pt={1} />
                        <Button
                            id="settings-button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => this.props.history.push("/settings")}
                        >
                            Settings
                        </Button>
                        <Box pt={1} />
                        <Button
                            id="back-button"
                            fullWidth
                            variant="contained"
                            color="dark"
                            onClick={() => this.props.history.goBack()}
                        >
                            Back
                        </Button>
                    </Card>
                </Grid>
                <Grid container direction="column" xs={12}>
                    <Grid item>
                        <Button
                            id="my-question-tab"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                this.setState({
                                    isQuestionTab: true
                                });
                            }}
                        >
                            My Questions
                        </Button>
                        <Button
                            id="my-answer-tab"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                this.setState({
                                    isQuestionTab: false
                                });
                            }}
                        >
                            My Answers
                        </Button>
                    </Grid>
                    <Grid item>
                        {this.state.isQuestionTab ? myQuestions : myAnswers}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userProfile: state.auth.profile,
        myQuestions: state.question.questions,
        myAnswers: state.answer.answers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: () => dispatch(actionCreators.getProfile()),
        getUserQuestions: () => dispatch(actionCreators.getUserQuestions()),
        getUserAnswers: () => dispatch(actionCreators.getUserAnswers())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Profile));
