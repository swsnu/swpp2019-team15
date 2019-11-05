import React from "react";
import "./AnswerView.css";
import moment from "moment";

//Materials UI imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const AnswerView = props => {
    return (
        <div className="AnswerView" key={props.key}>
            <Grid item>
                {props.is_answered ? (
                    <Card>
                        <CardContent>
                            <Typography
                                component="body"
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
                ) : (
                    <div>
                        Is it {props.content} in {props.place_name}?
                    </div>
                )}
            </Grid>
        </div>
    );
};

export default AnswerView;
