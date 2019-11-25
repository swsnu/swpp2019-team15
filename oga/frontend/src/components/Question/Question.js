import React from "react";
import moment from "moment";

//Materials UI imports
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: theme.spacing(3)
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    heading: {
        paddingTop: 20,
        fontWeight: "bold"
    },
    subheading: {
        color: "#ff9933",
        fontWeight: "bold",
        lineHeight: 1.8
    },
    caption: {
        color: "#585858"
    }
}));

const Question = props => {
    const classes = useStyles();

    return (
        <Grid className="Question" item md={6} key={props.id}>
            <Card md={3} className={classes.card}>
                <CardContent align="left" className={classes.content}>
                    <div onClick={props.clickDetail}>
                        <Typography
                            className={classes.subheading}
                            id="question-author"
                            variant="subtitle1"
                        >
                            {props.author}
                        </Typography>
                        <Typography
                            id="question-publish-date-time"
                            className={classes.caption}
                            variant="caption"
                            gutterBottom
                        >
                            {moment(
                                props.publish_date_time,
                                "MMMM Do YYYY, h:mm:ss a"
                            ).fromNow()}{" "}
                            &mdash; {props.publish_date_time}
                        </Typography>
                        <Typography
                            className={classes.heading}
                            variant="h6"
                            gutterBottom
                        >
                            <div id="question-content">
                                Is it {props.content} in {props.location} ?
                            </div>
                        </Typography>
                    </div>
                    <Divider className={classes.divider} />
                    <Grid container justify="center" alignItems="center">
                        <Button
                            color="primary"
                            id="create-answer-button"
                            variant="contained"
                            onClick={props.clickAnswer}
                        >
                            Answer
                        </Button>

                        <Button
                            id="follow-button"
                            color="primary"
                            onClick={props.clickFollow}
                        >
                            Follow
                        </Button>
                        {props.is_answered ? (
                            <div className="answered-mark">&#128525;</div>
                        ) : (
                            <div>&#128591;</div>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Question;
