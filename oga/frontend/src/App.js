import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";

import Signup from "./containers/Login/Signup";
import Login from "./containers/Login/Login";
import Main from "./containers/Main/Main";
import Map from "./containers/Map/GoogleMap";
import NewQuestion from "./containers/QuestionList/NewQuestion/NewQuestion.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import NewAnswer from './containers/Answer/NewAnswer';
import { connect } from "react-redux";
import "./App.css";

let swRegistration = null;
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('/sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
}

function App(props) {
    let session = false;
    if (props.auth) session = props.auth;
    return (
        <ConnectedRouter history={props.history}>
            <div className="App">
                <Switch>
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/login" exact component={Login} />
                    <PrivateRoute
                        auth={session}
                        path="/main"
                        exact
                        component={Main}
                    />
                    <PrivateRoute
                        auth={session}
                        path="/questions/create"
                        exact
                        component={NewQuestion}
                    />
                    <PrivateRoute
                        auth={session}
                        path="/map"
                        exact
                        component={Map}
                    />
                    <PrivateRoute
                        auth={session}
                        path='/reply/:id'
                        exact
                        component={NewAnswer} />
                    <Redirect exact from="/" to="login" />
                    <Route render={() => <h1>Not Found</h1>} />
                </Switch>
            </div>
        </ConnectedRouter>
    );
}

const mapStateToProps = state => ({
    auth: state.auth.authenticated
});

export default connect(mapStateToProps)(App);
