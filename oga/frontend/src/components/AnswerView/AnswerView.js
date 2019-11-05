import React from "react";
import "./AnswerView.css";
import moment from "moment";

const AnswerView = props => {
    return (
        <div className="AnswerView" key={props.key}>
            {props.is_answered ? (
                <div className="answered">
                    <h2>{props.author} said</h2>
                    <h3>
                        "For {props.content}, it is {props.answer_content} in{" "}
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
            ) : (
                <div>
                    Is it {props.content} in {props.place_name}?
                </div>
            )}
        </div>
    );
};

export default AnswerView;
