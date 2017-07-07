import cookie from 'react-cookie';
import axios from 'axios';
import { push } from 'react-router-redux';
import { has as _has } from 'lodash';

import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  PROTECTED_TEST
} from './types';
import { API_URL } from '../constants';

//= =====================
// Auth Action Creators
//= =====================
export function loginUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/login`, { email, password })
      .then(response => {
        loginHandler(dispatch, response.data.token, response.data.user);
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export function registerUser({ email, firstName, lastName, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
      .then(response => {
        loginHandler(dispatch, response.data.token, response.data.user);
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });

    dispatch(push('/login'));
  }
}

export function protectedTest() {
  return function (dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { 'Authorization': cookie.load('token') }
    })
      .then(response => {
        // console.log(response);
        dispatch({
          type: PROTECTED_TEST,
          payload: response.data.content
        });
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export function clearAuthErrors() {
  return function (dispatch) {
    dispatch({
      type: AUTH_ERROR,
      payload: ''
    })
  }
}

export function fetchUser(token) {
  return function (dispatch) {
    axios.get(`${API_URL}/user/info`, {
      headers: { 'Authorization': token }
    })
      .then(response => {
        // set auth status to true and set user info
        dispatch({
          type: AUTH_USER,
          user: response.data.user
        });
      })
      .catch(error => {
        logoutUser();
      });
  }
}

//= =====================
// Handlers
//= =====================

// Login handler for setting token, user info, and auth status on 
// succesfull authentication
const loginHandler = (dispatch, token, user) => {
  // set web token
  cookie.save('token', token, { path: '/' });

  // set auth status to true and set user info
  dispatch({
    type: AUTH_USER,
    user: user
  });

  // reroute to dashboard
  dispatch(push('/dashboard'));
}

// Error handler for authentication errors
const errorHandler = (dispatch, error, type) => {
  console.log(error);

  // check for error message otherwise set as network error
  let errorMessage;
  const containsMessage = _has(error, 'data.message');
  if (containsMessage) {
    errorMessage = error.data.message;
  } else {
    errorMessage = 'Network Error: Please wait and try again.';
  }

  // if there is no message and status code is 401, send unauthorized error message
  if (_has(error, 'status') && error.status === 401 && !containsMessage) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}
