import React, { Component } from "react";
import "./NewAnswer.css";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";

import AnswerView from "../../components/AnswerView/AnswerView";
import { question_types } from "../../const/question_type";

class NewAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer_content: null,
      answered: false,
      id: this.props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.onGetQuestion(this.state.id);
  }

  postAnswerHandler = (question_content, answer_content, id) => {
    // console.log(this.state.answer_content)
    // console.log(this.state.answered)
    // console.log(this.props.selectedQuestion.content)
    if (this.state.answered)
    { // for testing purposes, we set type to 0, and pass content as well
      // actually, we only have to store type in questions, 
      // as content is fixed based on type
      this.props.createAnswer(question_content, answer_content, id);
    }

    postAnswerHandler = (question_content, answer_content, id) => {
        // console.log(this.state.answer_content)
        // console.log(this.state.answered)
        // console.log(this.props.selectedQuestion.content)
        if (
            this.state.answered &&
            this.props.selectedQuestion &&
            this.state.answer_content
        ) {
            // for testing purposes, we set type to 0, and pass content as well
            // actually, we only have to store type in questions,
            // as content is fixed based on type
            this.props.createAnswer(question_content, answer_content, id);
        }
    };

  render() {
    var selected_question_type = null;
    var selected_question_type_list = null;
    var qs_type = '';
    var idx = 0;
    let gotten_answer_view = null;
    if (this.props.selectedQuestion)
    {
      qs_type = this.props.selectedQuestion.content;
      qs_type = question_types[qs_type];
      selected_question_type_list = qs_type.map((val, index) => {
       
    return (
      <div className="Answer">
        <h1>
          Answer to a Question!
        </h1>
        `
        <h2>
          {gotten_answer_view}
        </h2>
      >
        <div>
          <div id="answer-choices"
            onChange={(event) => 
                this.setState({answer_content: event.target.value, answered: true})}>
                {selected_question_type_list}
              </div>
            </div>
            <button
              id="back-create-answer-button"
              onClick={() => this.clickBackHandler()}>Back
            </button>
            <button
              id="confirm-create-answer-button"
              onClick={() => this.postAnswerHandler(this.props.selectedQuestion.content,
                this.state.answer_content,
                this.props.match.params.id)}>Submit
              </button>
            </div>      
    );
  }
}

const mapStateToProps = state => {
    return {
        selectedQuestion: state.question.selectedQuestion
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetQuestion: id => dispatch(actionCreators.getQuestion(id)),
        createAnswer: (question_type, answer_content, id) =>
            dispatch(
                actionCreators.createAnswer(
                    {
                        question_type: question_type,
                        answer_content: answer_content
                    },
                    id
                )
            )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewAnswer);
