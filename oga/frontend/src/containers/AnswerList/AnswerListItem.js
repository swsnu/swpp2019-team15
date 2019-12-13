import React, { Component } from "react";
import "./AnswerList.css";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions";

import moment from "moment";
import AnswerView from "../../components/AnswerView/AnswerView";

//Material UI imports
import { Container, Grid } from "@material-ui/core";

class AnswerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            render_check: []
        };
    }

    clickAnswerHandler = id => {
        this.props.history.push("/reply/" + id);
    };

    clickAuthor = author => {
        this.props.history.push("/profile/" + author);
    };

    rateUpHandler = id => {
        let n = this.props.answers;
        console.log(n);
        //this.setState({state.answers[id].numbers_rated_up: n});
        this.props.rateUp(id);
        // Window reload handled in actionCreators
    };

    rateDownHandler = id => {
        this.props.rateDown(id);
        // Window reload handled in actionCreators
    };

    render() {
        var answers = null;
        var selectedAnswers = this.props.selectedAnswers;

        answers = selectedAnswers.map(ans => {
            return (
                <Grid item xs={6} key={ans.id}>
                    <AnswerView
                        auth={this.props.auth}
                        key={ans.id}
                        id={ans.id}
                        author={ans.author}
                        content={ans.question_type}
                        place_name={ans.location_name}
                        publish_date_time={moment(ans.publish_date_time).format(
                            "MMMM Do YYYY, h:mm:ss a"
                        )}
                        answer_content={ans.content}
                        is_answered={true}
                        is_up={ans.is_up}
                        is_rated={ans.is_rated}
                        clickAuthor={() => this.clickAuthor(ans.author)}
                        rateUp={() => this.rateUpHandler(ans.id)}
                        rateDown={() => this.rateDownHandler(ans.id)}
                        rateUpCount={ans.numbers_rated_up}
                        rateDownCount={ans.numbers_rated_down}
                        disableLike={ans.user_liked}
                        disableDislike={ans.user_disliked}
                        // prop to enable redirection when answer clicked
                        clickAnswer={() => this.clickAnswerHandler(ans.id)}
                    />
                </Grid>
            );
        });

        return (
            <Grid container spacing={2} direction="row">
                {answers}
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        rated_up: state.answer.rated_up,
        rated_down: state.answer.rated_down
    };
};

const mapDispatchToProps = dispatch => {
    return {
        rateUp: id => dispatch(actionCreators.rateUp(id)),
        rateDown: id => dispatch(actionCreators.rateDown(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AnswerList));
