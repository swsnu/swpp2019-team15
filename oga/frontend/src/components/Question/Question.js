import React from "react";
import moment from "moment";

//Materials UI imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Question = props => {
    return (
        <Grid item md={6} key={props.id}>
            <Card md={3} className="Question">
                <CardContent>
                    <Typography
                        component="h6"
                        variant="h6"
                        gutterBottom
                        onClick={props.clickDetail}
                    >
                        <div id="question-id">id: {props.id}</div>
                        <div id="question-author">Author: {props.author}</div>

                        <div id="question-content">
                            Is it <b>{props.content}</b> in{" "}
                            <b>{props.location}</b> ?
                        </div>
                        <div id="question-publish-date-time">
                            <p>
                                <i>
                                    {moment(
                                        props.publish_date_time,
                                        "MMMM Do YYYY, h:mm:ss a"
                                    ).fromNow()}
                                </i>{" "}
                                on {props.publish_date_time}
                            </p>
                        </div>
                        {props.is_answered ? (
                            <div className="answered-mark">&#128525;</div>
                        ) : (
                            <div>&#128591;</div>
                        )}
                    </Typography>
                    <Button
                        color="primary"
                        id="create-answer-button"
                        variant="contained"
                        onClick={props.clickAnswer}
                    >
                        Answer
                    </Button>
                    <Grid container justify="center" alignItems="center">
                        <Button
                            id="follow-button"
                            color="primary"
                            onClick={props.clickFollow}
                        >
                            Follow
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Question;
