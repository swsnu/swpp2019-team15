import React, { Component } from "react";
import "./NewQuestion.css";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import Map from "../../Map/GoogleMap";
import CustomRadio from "../../../components/MuiStyle/CustomRadio";
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
        if (this.state.content === "" || this.state.content === "How is it") {
            alert("Please select a question");
        } else if (this.props.target_location == null) {
            alert("Please enter a location");
        } else {
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

    // clickMapHandler = () => {
    //     this.props.history.push("/map");
    // };

    render() {
        let place_name = "there";
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
                <Grid item md={6} xs={12}>
                    <Map />
                </Grid>
                <Grid item md={6} xs={12} className="AskQuestion">
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
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                spacing={8}
                            >
                                <Grid>
                                    <FormControlLabel
                                        value="Are there LONG LINES"
                                        control={
                                            <CustomRadio imgsrc="/images/lines.png" />
                                        }
                                        label="LONG LINES"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="Are there MANY SEATS"
                                        control={
                                            <CustomRadio imgsrc="/images/seats.png" />
                                        }
                                        label="SEATS"
                                        labelPlacement="bottom"
                                    />
                                </Grid>
                                <Grid>
                                    <FormControlLabel
                                        value="Is it RAINING"
                                        control={
                                            <CustomRadio imgsrc="/images/rain.png" />
                                        }
                                        label="RAIN"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="Is it QUIET"
                                        control={
                                            <CustomRadio imgsrc="/images/noise.png" />
                                        }
                                        label="QUIET"
                                        labelPlacement="bottom"
                                    />
                                </Grid>
                            </Grid>
                        </RadioGroup>
                    </FormControl>
                    <Grid xs={3}>
                        <Box pt={10} />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            id="confirm-create-question-button"
                            onClick={() => this.postQuestionHandler()}
                        >
                            Submit
                        </Button>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
