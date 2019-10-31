import React, { Component } from 'react';
import './NewQuestion.css';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';

import { Redirect } from 'react-router-dom';
import { push } from 'connected-react-router';
import Map from '../../Map/GoogleMap';
import PushNotification from '../../../components/PushNotification/PushNotification'

class NewQuestion extends Component {
  state = {
    content: '....',
  }

  componentDidMount() {
    // if (!this.props.log_status) {
    //   this.props.history.push('/login');
    // }
  }

  postQuestionHandler = () => {
    if (this.state.content !== '' && this.props.target_location)
    { // for testing purposes, we set type to 0, and pass content as well
      // actually, we only have to store type in questions, 
      // as content is fixed based on type
      this.props.createQuestion(0, this.state.content, this.props.target_location);
    }
  }

  clickBackHandler = () => {
    this.props.history.goBack();
  }

  clickMapHandler = () => {
    this.props.history.push('/map');
  }

  render() {
    let place_name = "...";
    if (this.props.target_location)
      place_name = this.props.target_location.name;

    return (
      <div className="NewQuestion">
        <h1>Ask a New Question!</h1>
        {/* <label>Title</label> */}
        {/* <input
          id="question-title-input"
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        ></input> */}
        <div>
          <div onChange={(event) => this.setState({content: event.target.value})}>
            <input type="radio" value="LONG LINE" name="question" /> LINES?
            <input type="radio" value="MANY SEATS" name="question" /> SEATS?
            <input type="radio" value="RAINING" name="question" /> RAIN?
            <input type="radio" value="QUIET" name="question" /> QUIET?
          </div>
        </div>
        <div>Is it {this.state.content} in {place_name}?</div>
        <div>
          <Map/>
        </div>
        <div>
          {/*<button
            id="map-create-question-button"
            onClick={() => this.clickMapHandler()}>Map
          </button>*/}
        </div>
        <button
          id="back-create-question-button"
          onClick={() => this.clickBackHandler()}>Back
        </button>
        <button
          id="confirm-create-question-button"
          onClick={() => this.postQuestionHandler()}>Submit
        </button>
        <PushNotification/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //id: state.rd.id,
    //log_status: state.rd.log_status,
    //question_author: state.question.username,
    target_location: state.location.targetLocation,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createQuestion: (type, content, target_location) =>
      dispatch(actionCreators.createQuestion({ author: "HI", type: type, content: content, target_location: target_location})),
    //setLogout: () => 
    //dispatch(actionCreators.settingLogout())
    // prevQuestion: () =>
    //     dispatch(actionCreators.toggleToPreview()),
    // writQuestion: () =>
    //     dispatch(actionCreators.toggleToWrite()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
