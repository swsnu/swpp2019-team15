import { setTargetLocation, setCurrentCoordinates } from "./locationActions.js";

import {
    createQuestion,
    getQuestion,
    getQuestions,
    getUserQuestions,
    followQuestion,
    getQuestionRecommendation
} from "./questionActions.js";

import {
    signUp,
    signIn,
    isLoggedIn,
    Logout,
    // Login,
    getProfile
} from "./authActions.js";

import {
    checkRating,
    createAnswer,
    getAllAnswers,
    getAnswers,
    getAnswer,
    getUserAnswers,
    rateUp,
    rateDown
} from "./answerActions";

export {
    setTargetLocation,
    setCurrentCoordinates,
    createQuestion,
    getQuestion,
    getQuestions,
    getQuestionRecommendation,
    getUserQuestions,
    signUp,
    signIn,
    isLoggedIn,
    createAnswer,
    getAnswers,
    getAllAnswers,
    getAnswer,
    getUserAnswers,
    followQuestion,
    Logout,
    // Login,
    getProfile,
    checkRating,
    rateUp,
    rateDown
};
