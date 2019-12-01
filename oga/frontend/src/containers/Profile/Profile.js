import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";
import Question from "../../components/Question/Question";
import * as actionCreators from "../../store/actions/index";
import rank from "../../const/rank";

//Material UI imports
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isQuestionTab: true
        };
    }

    componentDidMount() {
        var username = this.props.match.params.username;
        if (username) {
            this.props.getUserProfile(username);
            this.props.getSingleUserQuestions(username);
            this.props.getSingleUserAnswers(username);
        } else {
            this.props.getProfile();
            this.props.getUserQuestions();
            this.props.getUserAnswers();
        }
    }

    onClickDetailHandler = id => {
        this.props.history.push("/replies/" + id);
    };

    render() {
        let username = "";
        // let follows = null
        let location = "Location unknown";
        let coordinates = "";
        if (this.props.userProfile) {
            var profile = this.props.userProfile;
            username = profile.username;
            // follows = profile.follows;

            if (this.props.userProfile.location) {
                location = `${profile.location}`;
                coordinates = `(${profile.latitude}, ${profile.longitude})`;
            }
        }

        var questions = this.props.myQuestions;
        let questionCount = questions.length;

        const myQuestions = questions.map(qs => {
            var time = moment(qs.publish_date_time).format(
                "MMMM Do YYYY, h:mm:ss a"
            );
            return (
                <div style={{ marginBottom: 5, marginTop: 5 }}>
                    <Question
                        key={qs.id}
                        id={qs.id}
                        author={qs.author}
                        publish_date_time={moment(qs.publish_date_time).format(
                            "MMMM Do YYYY, h:mm:ss a"
                        )}
                        content={qs.content}
                        location={qs.location}
                        is_answered={qs.is_answered}
                        showButtons={false}
                        clickDetail={() => this.onClickDetailHandler(qs.id)}
                    />
                </div>
            );
        });

        var answers = this.props.myAnswers;
        let answerCount = answers.length;

        const myAnswers = answers.map(ans => {
            var time = moment(ans.publish_date_time).format(
                "MMMM Do YYYY, h:mm:ss a"
            );

            return (
                <div style-={{ marginTop: 5, marginBottom: 5 }}>
                    <Card className="MyAnswer" key={ans.id} align="left">
                        <CardContent
                            onClick={() =>
                                this.onClickDetailHandler(ans.question_id)
                            }
                        >
                            <Typography
                                color="primary"
                                variant="subtitle1"
                                gutterBottom
                            >
                                <b>{ans.question_author} </b> asked{" "}
                                {moment(
                                    time,
                                    "MMMM Do YYYY, h:mm:ss a"
                                ).fromNow()}{" "}
                                &mdash; {time}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                For <b>{ans.question_type}</b>, it is{" "}
                                <b>{ans.content}</b> in <b>{ans.location}</b>!
                            </Typography>
                            <Typography
                                align="left"
                                variant="caption"
                                gutterBottom
                            >
                                {moment(
                                    time,
                                    "MMMM Do YYYY, h:mm:ss a"
                                ).fromNow()}{" "}
                                &mdash; {time}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            );
        });

        return (
            <div>
                {this.props.userProfile ? (
                    <Grid
                        container
                        className="Profile"
                        justify="center"
                        style={{ marginTop: 50 }}
                        direction="row"
                    >
                        <Grid
                            item
                            md={6}
                            xs={6}
                            direction="column"
                            align="center"
                        >
                            <Card style={{ maxWidth: "90%" }}>
                                <CardMedia
                                    style={{
                                        width: "100%",
                                        height: 320,
                                        objectFit: "cover"
                                    }}
                                    src={
                                        "http://englishmajorswithjobs.com/wp-content/uploads/2019/05/Haku-bicycle-1024x536.jpg"
                                    }
                                    component="img"
                                />
                                <CardContent align="center">
                                    <Grid container alignItems="center">
                                        <Grid
                                            item
                                            xs={4}
                                            direction="column"
                                            style={{ padding: 10 }}
                                        >
                                            <Avatar
                                                justify="center"
                                                src={
                                                    "https://image.flaticon.com/icons/png/512/185/185846.png"
                                                }
                                                compont="img"
                                                style={{
                                                    position: "absolute",
                                                    left: "9%",
                                                    top: 345,
                                                    margin: "6px",
                                                    border: "solid",
                                                    borderColor: "#fff",
                                                    borderWidth: "5px",
                                                    width: "150px",
                                                    height: "150px"
                                                }}
                                            />
                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                style={{
                                                    paddingTop: 50,
                                                    paddingBottom: 10
                                                }}
                                            >
                                                {username}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    color: "green",
                                                    paddingBottom: 20
                                                }}
                                            >
                                                {"   "}
                                                {/* TODO: Rank to be determined based on point system implementation */}
                                                {rank[10]}
                                            </Typography>

                                            <Typography variant="subtitle1">
                                                <i>
                                                    {location}
                                                    <br />
                                                    {coordinates}
                                                </i>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 50
                                                }}
                                            >
                                                {questionCount}
                                            </Typography>
                                            <Typography variant="caption">
                                                Questions Asked
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={4}
                                            direction="column"
                                            align="center"
                                        >
                                            <Typography
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 50
                                                }}
                                            >
                                                {answerCount}
                                            </Typography>
                                            <Typography variant="caption">
                                                Answers
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={6}
                            align="left"
                            direction="column"
                        >
                            <Grid style={{ maxWidth: "95%" }}>
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

                                <Grid item>
                                    {this.state.isQuestionTab
                                        ? myQuestions
                                        : myAnswers}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <h1>User "{this.props.match.params.username}" Not Found</h1>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userProfile: state.auth.profile,
        myQuestions: state.question.questions,
        myAnswers: state.answer.answers,
        counts_rating_up: state.rating.rating_up,
        counts_rating_down: state.rating.rating_down,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: () => dispatch(actionCreators.getProfile()),
        getUserProfile: username =>
            dispatch(actionCreators.getUserProfile(username)),
        getUserQuestions: () => dispatch(actionCreators.getUserQuestions()),
        getSingleUserQuestions: username =>
            dispatch(actionCreators.getSingleUserQuestions(username)),
        getUserAnswers: () => dispatch(actionCreators.getUserAnswers()),
        getSingleUserAnswers: username =>
            dispatch(actionCreators.getSingleUserAnswers(username))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Profile));
