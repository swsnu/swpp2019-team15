import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import locationReducer from "./reducers/locationReducer";
import questionReducer from "./reducers/questionReducer";
import authReducer from "./reducers/authReducer";
import answerReducer from "./reducers/answerReducer";
import rateReducer from "./reducers/rateReducer";

export const history = createBrowserHistory();
const rootReducer = combineReducers({
    location: locationReducer,
    question: questionReducer,
    auth: authReducer,
    answer: answerReducer,
    rating: rateReducer,
    router: connectRouter(history)
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
