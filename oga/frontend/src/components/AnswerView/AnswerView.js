import React from "react";
import "./AnswerView.css";

const AnswerView = props => {
    return (
        <div className="AnswerView" key={props.key}>
            Is it {props.content} in {props.place_name}?
            {props.is_answered ? (
                <div className="answered-mark">&#128525;</div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default AnswerView;