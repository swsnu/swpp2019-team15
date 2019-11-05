import React from "react";
import moment from "moment";

const Question = props => {
    return (
        <div className="Question" onClick={props.clickDetail}>
            <div id="question-id">id: {props.id}</div>
            <div id="question-author">Author: {props.author}</div>
            <div id="question-publish-date-time">
                Published{" "}
                <i>
                    {moment(
                        props.publish_date_time,
                        "MMMM Do YYYY, h:mm:ss a"
                    ).fromNow()}
                </i>{" "}
                on {props.publish_date_time}
            </div>
            <div id="question-content">
                Is it <b>{props.content}</b> in <b>{props.location}</b> ?
            </div>
            {props.is_answered ? (
                <div className="answered-mark">&#128525;</div>
            ) : (
                <div>&#128591;</div>
            )}
            <button onClick={props.clickAnswer}>Answer</button>
            <button onClick={props.clickFollow}>Follow</button>
        </div>
    );
};

export default Question;
