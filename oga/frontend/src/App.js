import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Signup from "./containers/Login/Signup";
import Login from "./containers/Login/Login";
import Main from "./containers/Main/Main";
import Map from "./containers/Map/GoogleMap";
import NewQuestion from "./containers/QuestionList/NewQuestion/NewQuestion.js";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import NewAnswer from "./containers/Answer/NewAnswer";
import AnswerList from "./containers/AnswerList/AnswerList";
import { connect } from "react-redux";
import PushAnswer from "./containers/Answer/PushAnswer/PushAnswer";

import * as actionCreators from "./store/actions/index";
import "./App.css";
import Settings from "./containers/Settings/Settings";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./components/MuiStyle/theme";

let swRegistration = null;
console.log("serviceWorker" in navigator);
console.log("PushManager" in window);
//if ("serviceWorker" in navigator && "PushManager" in window) {
//console.log("Service Worker and Push is supported");

//navigator.serviceWorker
//.register("/sw.js")
//.then(function(swReg) {
//console.log("Service Worker is registered", swReg);

//swRegistration = swReg;
//})
//.catch(function(error) {
//console.error("Service Worker Error", error);
//});
//} else {
//console.warn("Push messaging is not supported");
//}

function App(props) {
    let session = true;
    props.isLoggedIn(); //sets state's authenticate
    if (props.auth !== null)
        return (
            <MuiThemeProvider theme={theme}>
                <ConnectedRouter history={props.history}>
                    <div className="App">
                        <Switch>
                            <Route path="/signup" exact component={Signup} />
                            <Route path="/login" exact component={Login} />
                            <PrivateRoute
                                auth={props.auth}
                                path="/main"
                                exact
                                component={Main}
                            />
                            <PrivateRoute
                                auth={props.auth}
                                path="/ask"
                                exact
                                component={NewQuestion}
                            />
                            <PrivateRoute
                                auth={props.auth}
                                path="/map"
                                exact
                                component={Map}
                            />
                            <PrivateRoute
                                auth={props.auth}
                                path="/reply/create/:id"
                                exact
                                component={NewAnswer}
                            />
                            <PrivateRoute
                                auth={props.auth}
                                path="/replies/:id"
                                exact
                                component={AnswerList}
                            />
                            <PrivateRoute
                                auth={props.auth}
                                path="/reply/:id"
                                exact
                                component={PushAnswer}
                            />
                            <PrivateRoute
                                auth={props.auth}
                                path="/settings"
                                exact
                                component={Settings}
                            />
                            <Redirect exact from="/" to="/main" />
                            <Route render={() => <h1>Not Found</h1>} />
                        </Switch>
                    </div>
                </ConnectedRouter>
            </MuiThemeProvider>
        );
    else {
        return null;
    }
}

const mapStateToProps = state => ({
    auth: state.auth.authenticated
});

const mapDispatchToProps = dispatch => {
    return {
        isLoggedIn: () => dispatch(actionCreators.isLoggedIn())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
