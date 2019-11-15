import * as actionTypes from '../actions/actionTypes';

const initialState = {
//   selectedQuestion: null,
//   user_name: null,
//   targetLocation: null,
  answer: null,
  answers: []
}

const answerReducer = (action, state = initialState) => {
  switch (action.type) {
    case actionTypes.CREATE_ANSWER:
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
      console.log(state.a)
      return { ...state, answer: action.answer};
    default:
      break;
  }
  return state;
}

export default answerReducer;
