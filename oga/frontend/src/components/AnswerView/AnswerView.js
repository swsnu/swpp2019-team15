import React, { Component } from "react";
import moment from "moment";
import "./AnswerView.css";

//Materials UI imports
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Divider,
    Grid,
    Link,
    Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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

    render() {
        const { classes } = this.props;
        var sel = null;
        // if (this.props.is_answered && this.props.is_rated) {
        //     var selec1 = (
        //         <React.Fragment>
        //             Likes ({this.props.how_many_liked})
        //         </React.Fragment>
        //     );
        //     var selec2 = (
        //         <React.Fragment>
        //             Dislikes ({this.props.how_many_disliked})
        //         </React.Fragment>
        //     );
        //     if (this.props.is_up) {
        //         sel = <span>&#128077;</span>;
        //     } else {
        //         sel = <span>&#128078;</span>;
        //     }
        // }

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
                                <Link onClick={this.props.clickAuthor}>
                                    {this.props.author}
                                </Link>
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
                            >
                                {this.props.answer_content} in{" "}
                                {this.props.place_name}
                            </Typography>
                            <Divider className={classes.divider} />
                            <Grid align="center">
                                {/* {sel} */}
                                {/* {this.props.ratings} */}
                                {/* {selec1}
                                {selec2} */}
                                <div>
                                    <ButtonGroup className="Rating">
                                        <Button
                                            id="thumb_up-button"
                                            color="primary"
                                            onClick={this.props.rateUp}
                                            disabled={this.props.disableLike}
                                        >
                                            &#128077; {this.props.rateUpCount}
                                        </Button>
                                        <Button
                                            id="thumb_down-button"
                                            color="primary"
                                            onClick={this.props.rateDown}
                                            disabled={this.props.disableDislike}
                                        >
                                            &#128078; {this.props.rateDownCount}
                                        </Button>
                                    </ButtonGroup>
                                </div>
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
