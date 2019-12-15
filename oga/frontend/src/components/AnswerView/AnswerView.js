import React, { Component } from "react";
import moment from "moment";
import "./AnswerView.css";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

//Materials UI imports
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Divider,
    Grid,
    Link,
    Typography,
    Box
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
    card: {
        margin: "auto",
        transition: "0.3s",
        width: "100%",
        // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
        }
    },
    content: {
        textAlign: "left",
        padding: theme.spacing(3)
    },
    divider: {
        marginTop: theme.spacing(2)
        // marginBottom: theme.spacing(2)
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
    },
    buttons: {
        paddingTop: theme.spacing(2)
    }
});

class AnswerView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid
                // item
                // xs={6}
                className="AnswerView"
                key={this.props.id}
                style={{ height: "100%", width: "100%" }}
            >
                {this.props.is_answered ? (
                    <Card className={classes.card}>
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
                            <Box pt={2} />
                            <Link
                                color="inherit"
                                onClick={this.props.clickAnswer}
                            >
                                <Typography
                                    className={classes.heading}
                                    variant="h6"
                                >
                                    {this.props.answer_content} in{" "}
                                    {this.props.place_name}
                                </Typography>
                            </Link>
                            {/* prop to hide divider in Profile page view */}
                            {!this.props.hideDivider && (
                                <Divider className={classes.divider} />
                            )}
                            <Grid align="center" className="Ratings">
                                <ButtonGroup className={classes.buttons}>
                                    <Button
                                        id="thumb_up-button"
                                        color="primary"
                                        onClick={this.props.rateUp}
                                        disabled={
                                            !this.props.auth ||
                                            this.props.disableLike
                                        }
                                    >
                                        &#128077; {this.props.rateUpCount}
                                    </Button>
                                    <Button
                                        id="thumb_down-button"
                                        color="primary"
                                        onClick={this.props.rateDown}
                                        disabled={
                                            !this.props.auth ||
                                            this.props.disableDislike
                                        }
                                    >
                                        &#128078; {this.props.rateDownCount}
                                    </Button>
                                </ButtonGroup>
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

export default withStyles(useStyles)(AnswerView);
