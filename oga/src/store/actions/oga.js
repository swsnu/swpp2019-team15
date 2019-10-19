import * as actionTypes from './actionTypes.js';
import axios from 'axios';

import { push } from 'connected-react-router';


export const settingLoggedSucceed_ = (res) => {
  return {
    type: actionTypes.LOG_IN_SUCCEED,
    id: res.data.id,
    email: res.data.id,
    password: res.data.password,
    location_id: res.data.location_id,
  };
};

export const settingLoggedFail_ = (res) => {
  return {
    type: actionTypes.LOG_IN_FAIL,
    id: res.data.id,
    email: res.data.id,
    password: res.data.password,
    location_id: res.data.location_id,
  };
};

export const settingLogged = (email, password) => {
  return (dispatch) => {
    return axios.get('/api/user/' + email)
      .then(res => {
        if (password === res.password) {
          axios.put('/api/user/{email}', {...res.data, logged_in: true})
          axios.get('/api/user/{email}').then(res => {
            dispatch(settingLoggedSucceed_(res));
          })
          dispatch(push('/main'));
        } else {
          axios.put('/api/user/{email}', {...res.data, logged_in: false});
          axios.get('/api/user/{email}').then(res => {
            dispatch(settingLoggedFail_(res));
          })
        }
      })
  };
};

export const settingLogout_ = (res) => {
  return {
    type: actionTypes.LOG_OUT,
    id: res.data.id,
    log_status: false,
  }
}

export const settingLogout = (id) => {
  return (dispatch) => {
    return axios.get('/api/user/' + id)
      .then(res => {
        dispatch(settingLogout_(res))
        axios.put('/api/user/{id}', {...res.data, logged_in: false});
        dispatch(push('/login'));
      })
  }
}

export const getQuestions_ = (data) => {
  return {
    type: actionTypes.GET_QUESTIONS,
    questions: data.questions,
  }
}

export const getQuestions = () => {
  return dispatch => {
    return axios.get('/api/questions')
      .then(res => dispatch(getQuestion_(res.data)));
  }
}

export const getQuestion_ = (data) => {
  return {
    type: actionTypes.GET_QUESTION,
    selectedQuestion: data.question,
  }
}

export const getQuestion = (id) => {
  return dispatch => {
    return axios.get('/api/questions/' + id)
      .then(res => {
        dispatch(getQuestion_(res.data));
      })
  }
}

export const createQuestion_ = (res) => {
  return {
    type: actionTypes.CREATE_QUESTION,
    id: res.data.id,
    author_id: res.data.author_id,
    title: res.data.title,
    content: res.data.content,
  }
}

export const createQuestion = (rd) => {
  return (dispatch) => {
    return axios.post('/api/questions', rd)
      .then(res => {
        dispatch(createQuestion_(res));
        dispatch(push('/main/questions/' + res.data.id))
      })
  }
}

export const setTargetLocation_ = (target) => {
  return {
    type: actionTypes.SET_TARGET_LOCATION,
    name: target.name,
    latitude: target.geometry.location.lat(),
    longitude: target.geometry.location.lng(),
  }
}

export const setTargetLocation = (target) => {
  return (dispatch) => {
    return dispatch(setTargetLocation_(target));
  }
}

export const setCurrentCoordinates_ = (coordinates) => {
  return {
    type: actionTypes.SET_CURRENT_COORDINATES,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  }
}

export const setCurrentCoordinates = (coordinates) => {
  return (dispatch) => {
    return dispatch(setCurrentCoordinates_(coordinates));
  }
}
