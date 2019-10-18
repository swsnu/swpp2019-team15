import React, { Component } from 'react';
import './NewQuestion.css';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import { Redirect } from 'react-router-dom';
import { push } from 'connected-react-router';

class NewQuestion extends Component {
  state = {
    title: '',
    content: '',
    back: false,
  }

  componentDidMount() {
    // if (!this.props.log_status) {
    //   this.props.history.push('/login');
    // }
  }

  postQuestionHandler = () => {
    if (this.state.title !== '' && this.state.content !== '')
    {
        this.props.crQuestion(this.state.title, this.state.content);
    }
  }

  postBackHandler = () => {
    this.setState({...this.state, back:true})
  }

  render() {
      let redirect = null;
      if (this.state.back) {
          redirect = <Redirect to='/main/questions/' />
      }
    return (
      <div className="NewQuestion">
        {redirect}
        <h1>Add a New Question!</h1>
        {/* <label>Title</label> */}
        {/* <input
          id="question-title-input"
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        ></input> */}
        <div>
            <label>Enter Question!</label>
            <textarea
            id="question-content-input"
            rows="4"
            type="text"
            value={this.state.question_content}
            onChange={(event) => this.setState({ content: event.target.value })}
            >
            </textarea>
        </div>
        <button
            id="back-create-question-button"
            onClick={() => this.postBackHandler()}>Back</button>
        <button
            id="confirm-create-question-button"
            onClick={() => this.postQuestionHandler()}>Create</button>
        <button
            id="logout-button"
            onClick={() => this.props.setLogout()}>Log-out</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      id: state.rd.id,
      log_status: state.rd.log_status,
      question_author: state.rd.username,
    };
  }

const mapDispatchToProps = dispatch => {
  return {
    crQuestion: (title, content) =>
        dispatch(actionCreators.createQuestion({ question_author: this.props.username, question_content: this.question_content})),
    setLogout: () => 
        dispatch(actionCreators.settingLogout())
    // prevQuestion: () =>
    //     dispatch(actionCreators.toggleToPreview()),
    // writQuestion: () =>
    //     dispatch(actionCreators.toggleToWrite()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);