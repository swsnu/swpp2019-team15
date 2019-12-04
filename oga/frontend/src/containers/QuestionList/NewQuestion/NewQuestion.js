import React, { Component } from "react";
import "./NewQuestion.css";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import Map from "../../Map/GoogleMap";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CustomRadio from "../../../components/MuiStyle/CustomRadio";
import { FormControl, RadioGroup, FormControlLabel } from "@material-ui/core";

class NewQuestion extends Component {
    state = {
        content: "...."
    };

    componentDidMount() {}

    postQuestionHandler = () => {
        if (this.state.content !== "" && this.props.target_location) {
            // for testing purposes, we set type to 0, and pass content as well
            // actually, we only have to store type in questions,
            // as content is fixed based on type
            this.props.createQuestion(
                0,
                this.state.content,
                this.props.target_location
            );
        }
    };

    clickBackHandler = () => {
        this.props.history.goBack();
    };

    clickMapHandler = () => {
        this.props.history.push("/map");
    };

    render() {
        let place_name = "...";
        if (this.props.target_location)
            place_name = this.props.target_location.name;

        return (
            <Grid
                container
                className="NewQuestion"
                justify="center"
                align="center"
                direction="row"
            >
                <Grid item xs={6}>
                    <Map />
                </Grid>
                <Grid item xs={6}>
                    <Box pt={20} />
                    <Typography component="h1" variant="h4">
                        Ask a New Question!
                    </Typography>
                    <Box pt={5} />
                    <div id="view">
                        Is it {this.state.content} in {place_name}?
                    </div>
                    <FormControl>
                        <RadioGroup
                            aria-label="question-type"
                            onChange={event =>
                                this.setState({
                                    content: event.target.value
                                })
                            }
                        >
                            <Grid container direction="rows">
                                <FormControlLabel
                                    value="LONG LINE"
                                    control={<CustomRadio color="primary" />}
                                    label="LONG LINES"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="MANY SEATS"
                                    control={<CustomRadio color="primary" />}
                                    label="SEATS"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="RAINING"
                                    control={<CustomRadio color="primary" />}
                                    label="RAIN"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="QUIET"
                                    control={<CustomRadio color="primary" />}
                                    label="QUIET"
                                    labelPlacement="bottom"
                                />
                            </Grid>
                        </RadioGroup>
                    </FormControl>
                    <Box pt={10} />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        id="confirm-create-question-button"
                        onClick={() => this.postQuestionHandler()}
                    >
                        Submit
                    </Button>
                    <Grid container justify="center" alignItems="center">
                        <Button
                            id="back-create-question-button"
                            color="primary"
                            onClick={() => this.clickBackHandler()}
                        >
                            Back
                        </Button>
                        <Box pt={5} />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        //id: state.rd.id,
        //log_status: state.rd.log_status,
        //question_author: state.question.username,
        target_location: state.location.targetLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createQuestion: (type, content, target_location) =>
            dispatch(
                actionCreators.createQuestion({
                    author: "HI",
                    type: type,
                    content: content,
                    target_location: target_location
                })
            )
        //setLogout: () =>
        //dispatch(actionCreators.settingLogout())
        // prevQuestion: () =>
        //     dispatch(actionCreators.toggleToPreview()),
        // writQuestion: () =>
        //     dispatch(actionCreators.toggleToWrite()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
