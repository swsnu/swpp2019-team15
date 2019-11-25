import React, { Component } from "react";
import "./AnswerView.css";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/";

//Materials UI imports
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spaceing(3)
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
});

class AnswerView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            just_rated_answer: null
        };
    }

    componentDidMount() {
        this.props.onGetAll(this.props.id);
    }

    rateUpHandler = id => {
        this.props.rateUp(id);
        this.setState({ just_rated_answer: this.props.id });
    };

    rateDownHandler = id => {
        this.props.rateDown(id);
        this.setState({ just_rated_answer: this.props.id });
    };

    render() {
        console.log(this.state.just_rated_answer);
        const { classes } = this.props;
        // var selec = null;
        var ratings = (
            <React.Fragment>
                {!this.props.is_rated ? (
                    <div className="Rating">
                        <Button
                            id="thumb_up-button"
                            color="primary"
                            onClick={() => this.rateUpHandler(this.props.id)}
                        >
                            &#128077;
                        </Button>
                        <Button
                            id="thumb_down-button"
                            color="primary"
                            onClick={() => this.rateDownHandler(this.props.id)}
                        >
                            &#128078;
                        </Button>
                    </div>
                ) : null
                // selec =
                // (this.props.is_up) ? (<div>&#128077;</div>) : (<div>&#128078;</div>)
                }
                {this.state.just_rated_answer == this.props.id ? (
                    this.props.is_up ? (
                        <div>&#128077;</div>
                    ) : (
                        <div>&#128078;</div>
                    )
                ) : null}
            </React.Fragment>
        );
        return (
            <div className="AnswerView" key={this.props.id}>
                <Grid item>
                    {this.props.is_answered ? (
                        <Card md={3} className={classes.card}>
                            <CardContent className={classes.content}>
                                <div className="answered">
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
                                </div>
                            </CardContent>
                            <div>{ratings}</div>
                        </Card>
                    ) : (
                        <div>
                            Is it {this.props.content} in{" "}
                            {this.props.place_name}?
                        </div>
                    )}
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        is_rated: state.rating.is_rated,
        is_up: state.rating.is_up
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAll: id => dispatch(actionCreators.checkRating(id)),
        rateUp: id => dispatch(actionCreators.rateUp(id)),
        rateDown: id => dispatch(actionCreators.rateDown(id))
    };
};

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
// >>>>>>> 0c32078ce71d899cdd70cb899d42128d5609e2ee
// };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withStyles(styles)(AnswerView)));
