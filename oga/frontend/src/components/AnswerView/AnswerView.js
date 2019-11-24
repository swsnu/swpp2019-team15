import React from "react";
import "./AnswerView.css";
import moment from "moment";

//Materials UI imports
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    card: {
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    content: {
        textAlign: "left",
        padding: theme.spacing.unit * 3
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

const AnswerView = props => {
    const classes = useStyles();

    return (
        <Grid item md={6} className="AnswerView" key={props.id}>
            {props.is_answered ? (
                <Card md={3} className={classes.card}>
                    <CardContent className={classes.content}>
                        <div className="answered">
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
                                For {props.content}, it is{" "}
                                {props.answer_content} in {props.place_name}!
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div>
                    Is it {props.content} in {props.place_name}?
                </div>
            )}
        </Grid>
    );
};

export default AnswerView;
