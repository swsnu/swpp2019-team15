import * as actionTypes from '../actions/actionTypes';

const initialState = {
//   selectedQuestion: null,
//   user_name: null,
//   targetLocation: null,
  answer: null,
  answers: []
}

const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_QUESTION:
      const newAnswer = {
        question_id: action.question_id,
        author_id: action.author_id,
        question_type: action.question_type,
        answer_content: action.answer_content
      };
      return { ...state, answer: newAnswer };
    case actionTypes.GET_ANSWERS:
      return { ...state, answers: action.answers };
    case actionTypes.GET_ANSWER:
      return { ...state, answer: action.anser};
    default:
      break;
  }
  return state;
}

export default answerReducer;