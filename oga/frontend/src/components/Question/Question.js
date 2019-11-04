import React from "react";

const Question = props => {
    // TODO: fix ugly date time format
    return (
        <div className="Question">
            <div id="question-id">id: {props.id}</div>
            <div id="question-author">Author: {props.author}</div>
            <div id="question-publish-date-time">
                Published on: {props.publish_date_time}
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
            {/* <button onClick={props.clickDetail}>{props.title}</button> */}
        </div>
    );
};

export default Question;
