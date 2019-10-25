import React from 'react';

const Question = (props) => {
  return (
    <div className="Question">
      <div>
          id: {props.id}
      </div>
      <div>
        &nbsp;author_id: {props.author_id}
      </div>
        <div>
        &nbsp;title:&nbsp;
        </div>
      <button onClick={props.clickDetail}>
      {props.title}
      </button>
    </div>
  );
};

export default Question;