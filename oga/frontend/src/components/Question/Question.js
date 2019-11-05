import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Question = props => {
    return (
        <Grid item md={6} key={props.id}>
            <Card
                md={3}
                className="Question"
                onClick={props.clickDetail}
            >
                <CardContent>
                    <Typography component="body" gutterBottom>
                        <div id="question-id">id: {props.id}</div>
                        <div id="question-author">Author: {props.author}</div>
                        <div id="question-publish-date-time">
                            Published on: {props.publish_date_time}
                        </div>
                        <div id="question-content">
                            Is it <b>{props.content}</b> in{" "}
                            <b>{props.location}</b> ?
                        </div>
                        {props.is_answered ? (
                            <div className="answered-mark">&#128525;</div>
                        ) : (
                            <div>&#128591;</div>
                        )}
                    </Typography>
                    <Button
                        color="secondary"
                        id="create-answer-button"
                        variant="contained"
                        onClick={props.clickAnswer}
                    >
                        Answer
                    </Button>
                    <Grid container justify="center" alignItems="center">
                        <Button
                            id="follow-button"
                            color="secondary"
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
