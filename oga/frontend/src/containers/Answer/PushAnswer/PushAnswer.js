import React, { Component } from 'react';
import './PushAnswer.css';
import AnswerView from '../../../components/AnswerView/AnswerView'

import { connect } from 'react-redux';
import { withRouter } from "react-router";
import thunk from 'redux-thunk';
import * as actionCreators from '../../../store/actions';

import { Redirect } from 'react-router-dom';
import { push } from 'connected-react-router';

class PushAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
    };
  }


  componentDidMount() {
    this.props.onGetAnswer(this.state.id);
  }

  render() {
    var answer= null;
    if (this.props.selectedAnswer)
    {
        answer =
        <React.Fragment>
            <AnswerView
                key = {this.selectedAnswer.id}
                id = {this.selectedAnswer.id}
                author = {this.selectedAnswer.author}
                content = {this.selectedAnswer.question_type}
                publish_date_time = {this.selectedAnswer.publish_date_time}
                answer_content = {this.selectedAnswer.content}
                place_name = {this.selectedAnswer.place_name}
            ></AnswerView>
        </React.Fragment>
    }

    return (
        <div className="PushAnswer">
            <h1>You got this answer!</h1>
            {answer}
        </div>
    );
}
}

const mapStateToProps = state => {
return {
    selectedAnswer: state.answer.answer
    //log_status: state.rd.log_status,
};
};

const mapDispatchToProps = dispatch => {
return {
    onGetAnswer: (id) =>
        dispatch(actionCreators.getAnswer(id)),
    //setLogout: () =>
    //dispatch(actionCreators.settingLogout())
};
};

export default connect(
mapStateToProps,
mapDispatchToProps
)(withRouter(PushAnswer));