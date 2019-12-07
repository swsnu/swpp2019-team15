import React, { Component } from "react";
import "./NewQuestion.css";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import Map from "../../Map/GoogleMap";
import CustomRadio from "../../../components/MuiStyle/CustomRadio";
import Card from "@material-ui/core/Card";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    RadioGroup,
    Typography
} from "@material-ui/core";

class NewQuestion extends Component {
    state = {
        content: "How is it"
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
        let place_name = "......";
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
                <Grid item xs={6} className="AskQuestion">
                    <Box pt={5} />
                    <Typography variant="h6">Ask a New Question!</Typography>
                    <Box pt={8} />
                    <Typography id="view" variant="h4">
                        {this.state.content} in {place_name}?
                    </Typography>
                    <Box pt={8} />
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
                                    value="Are there LONG LINES"
                                    control={
                                        <CustomRadio imgsrc="/images/icons8-github-500.png" />
                                    }
                                    label="LONG LINES"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="Are there MANY SEATS"
                                    control={
                                        <CustomRadio imgsrc="/images/icons8-github-500.png" />
                                    }
                                    label="SEATS"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="Is it RAINING"
                                    control={
                                        <CustomRadio imgsrc="/images/icons8-github-500.png" />
                                    }
                                    label="RAIN"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="Is it QUIET"
                                    control={
                                        <CustomRadio imgsrc="/images/icons8-github-500.png" />
                                    }
                                    label="QUIET"
                                    labelPlacement="bottom"
                                />
                            </Grid>
                        </RadioGroup>
                    </FormControl>
                    <Box pt={5} />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        id="confirm-create-question-button"
                        onClick={() => this.postQuestionHandler()}
                    >
                        Submit
                    </Button>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
