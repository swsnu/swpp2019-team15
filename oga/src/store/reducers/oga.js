import * as actionTypes from '../actions/actionTypes';

const initialState = {
  questions: [
  ],
  id: 1,
  user_name: null,
  location_id: null,
  log_status: false,
  selectedQuestion: null,
  targetLocation: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOG_IN_SUCCEED:
      return { ...state, log_status: true}
    case actionTypes.LOG_IN_FAIL:
      return { ...state, log_status: false}
    case actionTypes.LOG_OUT:
      return { ...state, log_status: false}
    case actionTypes.CREATE_QUESTION:
      const newQuestion = {
        id: action.id,
        author_id: action.author_id,
        title: action.title,
        content: action.content
      };
      return { ...state, articles: state.articles.concat(newQuestion)};
    case actionTypes.GET_QUESTIONS:
      return { ...state, questions: action.questions };
    case actionTypes.GET_QUESTION:
      return {...state, selectedQuestion: action.selectedQuestion};
    case actionTypes.SET_TARGET_LOCATION:
      const target = {
        name: action.name,
        latitude: action.latitude,
        longitdue: action.longitude,
      }
      return {...state, targetLocation: target};
    default:
      break;
  }
  return state;
}

export default reducer;
