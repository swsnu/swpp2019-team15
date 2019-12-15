import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";
import Question from "../../components/Question/Question";
import AnswerView from "../../components/AnswerView/AnswerView";
import * as actionCreators from "../../store/actions/index";
import rank from "../../const/rank";

//Material UI imports
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from "@material-ui/core";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isQuestionTab: true
        };
    }

    componentDidMount() {
        var username = this.props.match.params.username;
        this.props.isLoggedIn();
        this.props.getProfile(username);
        this.props.getUserQuestions(username);
        this.props.getUserAnswers(username);
    }

    onClickDetailHandler = id => {
        this.props.history.push("/reply/" + id);
    };

    onClickAuthorHandler = author => {
        this.props.history.push("/profile/" + author);
    };

    clickAnswerHandler = id => {
        this.props.history.push("/reply/" + id);
    };

    rateUpHandler = id => {
        this.props.rateUp(id);
    };

    rateDownHandler = id => {
        this.props.rateDown(id);
    };

    render() {
        let username = "";
        let location = "";
        let coordinates = "";
        var todayQuestionCount = "";
        var todayAnswerCount = "";
        let reliability = "";
        let ranking = 0;
        if (this.props.userProfile) {
            var profile = this.props.userProfile;
            username = profile.username;
            location = `${profile.location}`;
            coordinates = `${profile.coordinates}`;
            todayQuestionCount = `${profile.todayQuestionCount}`;
            todayAnswerCount = `${profile.todayAnswerCount}`;
            reliability = `${profile.reliability}`;
            ranking = profile.ranking;
        }

        var questions = this.props.myQuestions;
        let questionCount = questions.length;

        const myQuestions = questions.map(qs => {
            return (
                <div style={{ marginBottom: 5, marginTop: 5 }} key={qs.id}>
                    <Question
                        key={qs.id}
                        id={qs.id}
                        author={username}
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
                <div
                    style={{ marginBottom: 5, marginTop: 5 }}
                    // onClick={() => this.onClickDetailHandler(ans.id)}
                >

                    <AnswerView
                        className="MyAnswer"
                        auth={this.props.auth}
                        key={ans.id}
                        align="left"
                        id={ans.id}
                        author={username}
                        content={ans.question_type}
                        answer_content={ans.content}
                        place_name={ans.location_name}
                        publish_date_time={moment(ans.publish_date_time).format(
                            "MMMM Do YYYY, h:mm:ss a"
                        )}
                        is_answered={true}
                        is_up={ans.is_up}
                        is_rated={ans.is_rated}
                        clickAuthor={null}
                        rateUp={() => this.rateUpHandler(ans.id)}
                        rateDown={() => this.rateDownHandler(ans.id)}
                        rateUpCount={ans.numbers_rated_up}
                        rateDownCount={ans.numbers_rated_down}
                        disableLike={ans.user_liked}
                        disableDislike={ans.user_disliked}
                        hideDivider={true}
                        clickAnswer={() => this.clickAnswerHandler(ans.id)}
                    />
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
                        <Grid item md={6} xs={6} align="center">
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
                                    <Grid
                                        container
                                        alignItems="center"
                                        direction="row"
                                    >
                                        <Grid
                                            item
                                            xs={4}
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
                                                {rank[ranking]}
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                <i>
                                                    Reliability
                                                    <br />
                                                    {reliability}
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
                                            <Typography
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 50
                                                }}
                                            >
                                                {todayQuestionCount}
                                            </Typography>
                                            <Typography variant="caption">
                                                Today you asked
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} align="center">
                                            <Typography
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 50
                                                }}
                                            >
                                                {answerCount}
                                            </Typography>
                                            <Typography variant="caption">
                                                Helped
                                            </Typography>
                                            <Typography
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 50
                                                }}
                                            >
                                                {todayAnswerCount}
                                            </Typography>
                                            <Typography variant="caption">
                                                Today you helped
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={6} align="left">
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
        auth: state.auth.authenticated,
        userProfile: state.auth.profile,
        myQuestions: state.question.questions,
        myAnswers: state.answer.answers,
        // counts_rating_up: state.rating.rating_up,
        // counts_rating_down: state.rating.rating_down,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        isLoggedIn: () => dispatch(actionCreators.isLoggedIn()),
        getProfile: username => dispatch(actionCreators.getProfile(username)),
        getUserQuestions: username =>
            dispatch(actionCreators.getUserQuestions(username)),
        getUserAnswers: username =>
            dispatch(actionCreators.getUserAnswers(username)),
        rateUp: id => dispatch(actionCreators.rateUp(id)),
        rateDown: id => dispatch(actionCreators.rateDown(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Profile));
