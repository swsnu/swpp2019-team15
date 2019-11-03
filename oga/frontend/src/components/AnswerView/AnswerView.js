import React from "react";
import "./AnswerView.css";

const AnswerView = props => {
    return (
        <div className="AnswerView" key={props.key}>
            Is it {props.content} in {props.place_name}?
            {/* <button onClick={props.clickDetail}>{props.title}</button> */}
        </div>
    );
};

export default AnswerView;