import React from "react";
import "./App.css";

import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import Login from "./containers/Login/Login";
import Main from "./containers/Main/Main";
import Map from "./containers/Map/GoogleMap";
import NewQuestion from "./containers/QuestionList/NewQuestion/NewQuestion.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import Signup from "./containers/Login/Signup";

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
