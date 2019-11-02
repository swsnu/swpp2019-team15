import React, { Component } from 'react';
import './NewAnswer.css';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/';

import { Redirect } from 'react-router-dom';
import { push } from 'connected-react-router';
import Map from '../Map/GoogleMap';
import PushNotification from '../../components/PushNotification/PushNotification'
import AnswerView from '../../components/AnswerView/AnswerView';
import {question_types} from '../../const/question_type';

class NewAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer_content: null,
      answered: false,
    };
  }


  componentDidMount() {
    this.props.onGetQuestion(this.props.match.params.id);
  }

  postAnswerHandler = (question_content, answer_content, id) => {
    console.log(this.state.answer_content)
    console.log(this.state.answered)
    console.log(this.props.selectedQuestion.content)
    if (this.state.answered && this.props.selectedQuestion && this.state.answer_content)
    { // for testing purposes, we set type to 0, and pass content as well
      // actually, we only have to store type in questions, 
      // as content is fixed based on type
      this.props.createAnswer(question_content, answer_content, id);
    }
  }

  clickBackHandler = () => {
    this.props.history.goBack();
  }

  render() {
    var selected_question_type = null;
    var selected_question_type_list = null;
    var qs_type = '';
    let gotten_answer_view = null;
    if (this.props.selectedQuestion)
    {
      qs_type = this.props.selectedQuestion.content;
      if (qs_type == "LONG LINE") {
        selected_question_type = 0;
      } else if (qs_type == "MANY SEATS") {
        selected_question_type = 1;
      } else if (qs_type == "RAINING") {
        selected_question_type = 2;
      } else if (qs_type == "QUIET") {
        selected_question_type = 3;
      }
      qs_type = question_types[selected_question_type];
      selected_question_type_list = qs_type.map((val) => {
          return (
            <div>
              <label>
                {val}
              </label>
               <input type="radio" value={val} name="answer" >
              </input> 
            </div>
          )
      }
    )

      gotten_answer_view =
      <React.Fragment>
        <AnswerView
          key={this.props.selectedQuestion.id}
          id={this.props.selectedQuestion.id}
          content={this.props.selectedQuestion.content}
          place_name={this.props.selectedQuestion.target_location_name}
        ></AnswerView>
      </React.Fragment>
  }

    // <React.Fragment>
    //   <div onChange={(event) => this.setState({answer_content: event.target.value})}>
    //     <input type="radio" value="VERY LONG" name="answer" /> VERY LONG
    //     <input type="radio" value="LONG" name="answer" /> LONG
    //     <input type="radio" value="MODERATE" name="answer" /> MIDDLE
    //     <input type="radio" value="SHORT" name="answer" /> SHORT
    //     <input type="radio" value="LONG LINE" name="answer" /> LONG LINE
    //   </div>
    //   </React.Fragment>
    //   <React.Fragment>
    //   <div onChange={(event) => this.setState({answer_content: event.target.value})}>
    //     <input type="radio" value="MANY" name="answer" /> MANY
    //     <input type="radio" value="MODERATE" name="answer" /> MODERATE
    //     <input type="radio" value="SMALL" name="answer" /> SMALL
    //   </div>
    //   </React.Fragment>
    //         <React.Fragment>
    //         <div onChange={(event) => this.setState({answer_content: event.target.value})}>
    //           <input type="radio" value="HEAVY" name="answer" /> HEAVY
    //           <input type="radio" value="MODERATE" name="answer" /> MODERATE
    //           <input type="radio" value="SMALL" name="answer" /> SMALL
    //           <input type="radio" value="NO" name="answer" /> NO
    //         </div>
    //         </React.Fragment>
    //               <React.Fragment>
    //               <div onChange={(event) => this.setState({answer_content: event.target.value})}>
    //                 <input type="radio" value="NOISY" name="answer" /> NOISY
    //                 <input type="radio" value="MODERATE" name="answer" /> MODERATE
    //                 <input type="radio" value="QUIET" name="answer" /> QUIET
    //               </div>
    //               </React.Fragment>

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
        <div onChange={(event) => this.setState({answer_content: event.target.value, answered: true})}>
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
    selectedQuestion: state.question.selectedQuestion,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetQuestion: (id) =>
      dispatch(actionCreators.getQuestion(id)),
    createAnswer: (question_type, answer_content, id) =>
      dispatch(actionCreators.createAnswer({'question_type': question_type,
                                            'answer_content': answer_content}, id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAnswer);
