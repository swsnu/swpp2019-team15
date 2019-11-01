import React, { Component } from 'react';
import './NewAnswer.css';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/';

import { Redirect } from 'react-router-dom';
import { push } from 'connected-react-router';
import Map from '../Map/GoogleMap';
import PushNotification from '../../components/PushNotification/PushNotification'
import NewQuestion from '../QuestionList/NewQuestion/NewQuestion';

class NewAnswer extends Component {
  state = {
    answer_content: '....',
  }

  componentDidMount() {
    this.props.onGetQuestion(this.props.match.params.id);
  }

  // postQuestionHandler = () => {
  //   if (this.state.content !== '' && this.props.target_location)
  //   { // for testing purposes, we set type to 0, and pass content as well
  //     // actually, we only have to store type in questions, 
  //     // as content is fixed based on type
  //     this.props.createQuestion(0, this.state.content, this.props.target_location);
  //   }
  // }

  // clickBackHandler = () => {
  //   this.props.history.goBack();
  // }

  // clickMapHandler = () => {
  //   this.props.history.push('/map');

  postQuestionHandler = () => {
    if (this.state.answer_content !== '' && this.props.selectedQuestion.question_type)
    { // for testing purposes, we set type to 0, and pass content as well
      // actually, we only have to store type in questions, 
      // as content is fixed based on type
      this.props.createAnswer(this.props.selectedQuestion_type, 0, this.props.state.answer_content);
    }
  }

  clickBackHandler = () => {
    this.props.history.goBack();
  }

  render() {
    let place_name = "...";
    if (this.props.target_location)
    {
      place_name = this.props.target_location.name;
    }
    let show = null;
    qs_type = this.props.selectedQuestion.question_type;
    if (qs_type == "LINE") {
      show =
      <React.Fragment>
      <div onChange={(event) => this.setState({answer_content: event.target.value})}>
        <input type="radio" value="VERY LONG" name="answer" /> VERY LONG
        <input type="radio" value="LONG" name="answer" /> LONG
        <input type="radio" value="MODERATE" name="answer" /> MIDDLE
        <input type="radio" value="SHORT" name="answer" /> SHORT
        <input type="radio" value="LONG LINE" name="answer" /> LONG LINE
      </div>
      </React.Fragment>
    } else if (qs_type == "SEAT") {
      show = 
      <React.Fragment>
      <div onChange={(event) => this.setState({answer_content: event.target.value})}>
        <input type="radio" value="MANY" name="answer" /> MANY
        <input type="radio" value="MODERATE" name="answer" /> MODERATE
        <input type="radio" value="SMALL" name="answer" /> SMALL
      </div>
      </React.Fragment>
    } else if (qs_type == "RAIN") {
      show = 
      <React.Fragment>
      <div onChange={(event) => this.setState({answer_content: event.target.value})}>
        <input type="radio" value="HEAVY" name="answer" /> HEAVY
        <input type="radio" value="MODERATE" name="answer" /> MODERATE
        <input type="radio" value="SMALL" name="answer" /> SMALL
        <input type="radio" value="NO" name="answer" /> NO
      </div>
      </React.Fragment>
    } else if (qs_type == "IS_QUIET") {
      show = 
      <React.Fragment>
      <div onChange={(event) => this.setState({answer_content: event.target.value})}>
        <input type="radio" value="NOISY" name="answer" /> NOISY
        <input type="radio" value="MODERATE" name="answer" /> MODERATE
        <input type="radio" value="QUIET" name="answer" /> QUIET
      </div>
      </React.Fragment>
    }

   return (
      <div className="Answer">
      `<NewQuestion
          key={this.props.selectedQuestion.id}
          id={this.props.selectedQuestion.id}
          content={this.props.selectedQuestion.content}
        />
        <div>
          <PushNotification/>
        </div>
      >
      <div>
        <h1>
          Answer to a Quetion!
        </h1>
        {show}
      </div>
      <button
        id="back-create-answer-button"
        onClick={() => this.clickBackHandler()}>Back
      </button>
      <button
        id="confirm-create-answer-button"
        onClick={() => this.postQuestionHandler()}>Submit
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
    createAnswer: (question_type, author, answer_content) =>
      dispatch(actionCreators.createAnswer({'question_type': question_type,
                                            'answer_author': author,
                                            'answer_content': answer_content}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAnswer);
