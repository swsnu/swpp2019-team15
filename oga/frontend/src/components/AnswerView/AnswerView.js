import React from "react";
import "./AnswerView.css";
import moment from "moment";

//Materials UI imports
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const AnswerView = props => {
    return (
        <div className="AnswerView">
            {props.is_answered ? (
                <Grid item key={props.key}>
                    <Card className="Question">
                        <CardContent>
                            <Typography
                                component="body"
                                variant="outlined"
                                borderStyle="solid"
                                borderColor="primary"
                                gutterBottom
                                onClick={props.clickDetail}
                            >
                                <div className="answered">
                                    <h2>{props.author} said</h2>
                                    <h3>
                                        "For {props.content}, it is{" "}
                                        {props.answer_content} in{" "}
                                        {props.place_name}!"
                                    </h3>
                                    <p>
                                        <i>
                                            {moment(
                                                props.publish_date_time,
                                                "MMMM Do YYYY, h:mm:ss a"
                                            ).fromNow()}
                                        </i>{" "}
                                        on {props.publish_date_time}
                                    </p>
                                </div>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ) : (
                <div>
                    Is it {props.content} in {props.place_name}?
                </div>
            )}
        </div>
    );
};

export default AnswerView;
