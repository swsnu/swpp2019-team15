import React from "react";

const Question = props => {
    return (
        <div className="Question">
            <div>id: {props.id}</div>
            <div>author: {props.author}</div>
            <div>published: {props.publish_date_time}</div>
            <div>content: {props.content}</div>
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
