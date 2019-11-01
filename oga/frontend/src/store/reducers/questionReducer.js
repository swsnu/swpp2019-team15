import * as actionTypes from '../actions/actionTypes';

const initialState = {
  selectedQuestion: null,
  user_name: null,
  targetLocation: null,
  questions: []
}

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_QUESTION:
      const newQuestion = {
        id: action.id,
        author_id: action.author_id,
        content: action.content,
        target_location: action.target_location,
      };
      return { ...state, questions: state.questions.concat(newQuestion)};
      return {...state};
    case actionTypes.GET_QUESTIONS:
      return { ...state, questions: action.questions };
    case actionTypes.GET_QUESTION:
      return {...state, selectedQuestion: action.selectedQuestion};
    default:
      break;
  }
  return state;
}

export default questionReducer;
