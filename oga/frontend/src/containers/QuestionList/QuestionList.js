import React, { Component } from 'react';

import Question from '../../components/Question/Question';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';

class QuestionList extends Component {
  componentDidMount() {
    this.props.onGetAll();
    // if (!this.props.log_status) {
    //   this.props.history.push('/login');
    // }
  }

  clickTodoHandler = (ar) => {
    this.props.history.push('/questions/' + ar.id);
  }

  render() {
    const Questions = this.props.storedQuestions.map((qs) => {
      return (
        <Question
          key={qs.id}
          id={qs.id}
          title={qs.title}
          author_id={qs.author_id}
          clickDetail={() => this.clickTodoHandler()}
        />
      );
    });

    return (
      <div className="QuestionList">
        <div className='title'>
          {this.props.title}
        </div>
        {Questions}
        <div>
          <NavLink to='/main/questions/create' exact>New Question</NavLink>
        </div>
        <button
          id="logout-button"
          onClick={() => this.props.setLogout()}>Log-out</button>
      </div>  
    )
  }
}

const mapStateToProps = state => {
  return {
    storedQuestions: state.question.questions,
    //log_status: state.rd.log_status,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    //onGetAll: () =>
      //dispatch(actionCreators.getQuestions()),
    //setLogout: () => 
      //dispatch(actionCreators.settingLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuestionList));
