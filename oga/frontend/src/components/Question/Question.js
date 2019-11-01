import React from "react";

const Question = props => {
    return (
        <div className="Question">
            <div>id: {props.id}</div>
            <div>author: {props.author}</div>
            <div>published: {props.publish_date_time}</div>
            <div>content: {props.content}</div>
            {/* <button onClick={props.clickDetail}>{props.title}</button> */}
        </div>
    );
};

export default Question;
