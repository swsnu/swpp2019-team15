import React, { Component } from "react";
import "./AnswerView.css";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/";

//Materials UI imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class AnswerView extends Component {

    componentDidMount() {
        this.props.onGetAll(this.props.id);
    }

    rateUpHandler = (id) => {
        this.props.rateUp(id);
    };

    rateDownHandler = (id) => {
        this.props.rateDown(id);
    };

    render() {
        
        return (
            <div className="AnswerView" key={this.props.id}>
                <Grid item>
                    {this.props.is_answered ? (
                        <Card>
                            <CardContent>
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    gutterBottom
                                    onClick={this.props.clickDetail}
                                >
                                    <div className="answered">
                                        <h2>{this.props.author} said</h2>
                                        <h3>
                                            "For {this.props.content}, it is{" "}
                                            {this.props.answer_content} in{" "}
                                            {this.props.place_name}!"
                                        </h3>
                                        <p>
                                            <i>
                                                {moment(
                                                    this.props.publish_date_time,
                                                    "MMMM Do YYYY, h:mm:ss a"
                                                ).fromNow()}
                                            </i>{" "}
                                            on {this.props.publish_date_time}
                                        </p>
                                        <div>
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
                                            ) : (
                                                (this.props.isUp) ? (<div>&#128077;</div>) : (<div>&#128078;</div>)
                                            )}
                                        </div>
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    ) : (
                        <div>
                            Is it {this.props.content} in {this.props.place_name}?
                        </div>
                    )}
                </Grid>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        is_rated: state.rating.is_rated,
        is_up: state.rating.is_up,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAll: id => dispatch(actionCreators.checkRating(id)),
        rateUp: id => dispatch(actionCreators.rateUp(id)),
        rateDown: id => dispatch(actionCreators.rateDown(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AnswerView));