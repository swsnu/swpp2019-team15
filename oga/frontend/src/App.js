import React from "react";
import "./App.css";
import Login from "./containers/Login/Login";
import QuestionList from "./containers/QuestionList/QuestionList";
import NewQuestion from "./containers/QuestionList/NewQuestion/NewQuestion.js";
import RealDetail from "./containers/QuestionList/RealDetail/RealDetail.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import Map from "./containers/Map/GoogleMap";
import { connect } from "react-redux";

import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Signup from "./containers/Login/Signup";

function App(props) {
    let session = false;
    if (props.auth) session = props.auth;
    return (
        <ConnectedRouter history={props.history}>
            <div className="App">
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
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
