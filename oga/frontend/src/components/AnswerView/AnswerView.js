import React, { Component } from "react";
import moment from "moment";
import "./AnswerView.css";

//Materials UI imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const styles = theme => ({
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
        padding: theme.spacing(3)
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    heading: {
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
});

class AnswerView extends Component {
    constructor(props) {
        super(props);
    }

    rateUpHandler = id => {
        this.props.rateUp(id);
    };

    rateDownHandler = id => {
        this.props.rateDown(id);
    };

    render() {
        const { classes } = this.props;

        var selec = null;
        var sel = null;
        if (this.props.is_answered && this.props.is_rated) {
            selec = this.props.how_many_liked
            selec += "peoples liked this answer!"
            selec = this.props.how_many_disliked
            selec += "peoples disliked this answer!"
            if (this.props.is_up) {
                sel = <React.Fragment>&#128077;</React.Fragment>;
            } else {
                sel = <React.Fragment>&#128078;</React.Fragment>;
            }
        }

        return (
            <Grid className="AnswerView" key={this.props.id}>
                {this.props.is_answered ? (
                    <Card md={3} className={classes.card}>
                        <CardContent className={classes.content}>
                            <Typography
                                className={classes.subheading}
                                id="question-author"
                                variant="subtitle1"
                            >
                                {this.props.author}
                            </Typography>
                            <Typography
                                id="question-publish-date-time"
                                className={classes.caption}
                                variant="caption"
                                gutterBottom
                            >
                                {moment(
                                    this.props.publish_date_time,
                                    "MMMM Do YYYY, h:mm:ss a"
                                ).fromNow()}{" "}
                                &mdash; {this.props.publish_date_time}
                            </Typography>
                            <Typography
                                className={classes.heading}
                                variant="h6"
                                gutterBottom
                            >
                                For {this.props.content}, it is{" "}
                                {this.props.answer_content} in{" "}
                                {this.props.place_name}!
                            </Typography>
                            <Divider className={classes.divider} />
                            <Grid align="center">
                                {this.props.ratings}
                                {selec}
                                {sel}
                            </Grid>
                        </CardContent>
                    </Card>
                ) : (
                    <div>
                        {this.props.content} in {this.props.place_name}?
                    </div>
                )}
            </Grid>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         is_rated: state.rating.is_rated,
//         is_up: state.rating.is_up,
//         rate_up: state.rating.rate_up,
//         rate_down: state.rating.rate_down,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         // onGetAll: id => dispatch(actionCreators.checkRating(id)),
//         rateUp: id => dispatch(actionCreators.rateUp(id)),
//         rateDown: id => dispatch(actionCreators.rateDown(id))
//     };
// };

// const AnswerView = props => {
//     const classes = useStyles();

//     return (
//         <Grid item md={6} className="AnswerView" key={props.id}>
//             {props.is_answered ? (
//                 <Card md={3} className={classes.card}>
//                     <CardContent className={classes.content}>
//                         <div className="answered">
//                             <Typography
//                                 className={classes.subheading}
//                                 id="question-author"
//                                 variant="subtitle1"
//                             >
//                                 {props.author}
//                             </Typography>
//                             <Typography
//                                 id="question-publish-date-time"
//                                 className={classes.caption}
//                                 variant="caption"
//                                 gutterBottom
//                             >
//                                 {moment(
//                                     props.publish_date_time,
//                                     "MMMM Do YYYY, h:mm:ss a"
//                                 ).fromNow()}{" "}
//                                 &mdash; {props.publish_date_time}
//                             </Typography>
//                             <Typography
//                                 className={classes.heading}
//                                 variant="h6"
//                                 gutterBottom
//                             >
//                                 For {props.content}, it is{" "}
//                                 {props.answer_content} in {props.place_name}!
//                             </Typography>
//                         </div>
//                     </CardContent>
//                 </Card>
//             ) : (
//                 <div>
//                     Is it {props.content} in {props.place_name}?
//                 </div>
//             )}
//         </Grid>
//     );
// };

export default withStyles(styles)(AnswerView);
