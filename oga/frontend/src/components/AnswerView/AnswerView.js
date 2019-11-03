import React from "react";
import "./AnswerView.css";

const AnswerView = props => {
    return (
        <div className="AnswerView" key={props.key}>
            {props.is_answered ? (
                <div className="answered">
                    <h2>
                        {props.author} said
                    </h2>
                    <h3>
                        "For {props.content}, it is {props.answer_content} in {props.place_name}!"
                    </h3>
                    <h3>
                        At {props.publish_date_time}
                    </h3>
                </div>
            ) : (
                <div> Is it {props.content} in {props.place_name}? </div>
            )}
        </div>
    );
};

export default AnswerView;