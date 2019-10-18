import React from 'react';
import './App.css';

import LogIn from './containers/LogIn/LogIn';
import QuestionList from './containers/QuestionList/QuestionList';
import NewQuestion from './containers/QuestionList/NewQuestion/NewQuestion.js';
import RealDetail from './containers/QuestionList/RealDetail/RealDetail.js'

import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';


function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/login' exact render={() => <LogIn title="Log In" />} />
          <Route path='/main/questions' exact render={() => <QuestionList title="QUESTIONS"  />} />
          <Route path='/main/questions/create' exact component={NewQuestion} />
          <Route path='/main/questions/:id' exact component={RealDetail} />
          <Redirect exact from='/' to='login' />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div >
    </ConnectedRouter>
  );
}

export default App;