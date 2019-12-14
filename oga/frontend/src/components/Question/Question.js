import React from "react";
import moment from "moment";

//Materials UI imports
import { makeStyles } from "@material-ui/core/styles";
import CommentIcon from "@material-ui/icons/Comment";
import {
    Avatar,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Link,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        margin: "auto",
        transition: "0.3s",
        // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        height: "100%",
        "&:hover": {
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
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
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    heading: {
        paddingTop: 20,
        fontWeight: "bold"
    },
    icon: {
        fill: "lightgrey"
    },
    subheading: {
        color: "#ff9933",
        fontWeight: "bold",
        lineHeight: 1.8
    },
    caption: {
        color: "#585858"
    },
    chip: {
        marginRight: 10,
        marginLeft: 10,
        color: "#fff"
    },
    badge: {
        marginRight: 10,
        marginLeft: 10
    }
}));

const Question = props => {
    const classes = useStyles();

    return (
        <Grid className="Question" key={props.id} style={{ height: "100%" }}>
            <Card className={classes.card}>
                <CardContent align="left" className={classes.content}>
                    <Typography
                        className={classes.subheading}
                        id="question-author"
                        variant="subtitle1"
                    >
                        <Link onClick={props.clickAuthor}>{props.author}</Link>
                        {props.is_answered ? (
                            <span> &#128525;</span>
                        ) : (
                            <span> &#128591;</span>
                        )}
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
                    <Link color="inherit">
                        <Typography
                            className={classes.heading}
                            variant="h6"
                            gutterBottom
                            id="question-content"
                            onClick={props.clickDetail}
                        >
                            {props.content} in {props.location}?
                        </Typography>
                    </Link>
                    {props.showButtons && (
                        <div>
                            <Divider className={classes.divider} />
                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                            >
                                <Chip
                                    className={classes.chip}
                                    avatar={
                                        <Avatar style={{ color: "#000" }}>
                                            {props.answer_count}
                                        </Avatar>
                                    }
                                    id="create-answer-button"
                                    label="Answer"
                                    clickable
                                    color="primary"
                                    onClick={props.clickAnswer}
                                />
                                <Chip
                                    className={classes.chip}
                                    avatar={
                                        <Avatar style={{ color: "#000" }}>
                                            {props.follow_count}
                                        </Avatar>
                                    }
                                    id="follow-button"
                                    label="Follow"
                                    clickable
                                    color="primary"
                                    onClick={props.clickFollow}
                                />
                            </Grid>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Question;
