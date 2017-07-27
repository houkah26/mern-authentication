import cookie from 'react-cookie';
import axios from 'axios';
import { push } from 'react-router-redux';
import { has as _has } from 'lodash';

import errorHandler from "./errorHandler";

//= =====================
// Auth Action Creators
//= =====================
export function loginUser({ username, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/login`, { username, password })
      .then(response => {
        loginHandler(dispatch, response.data.token, response.data.user);
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export function registerUser({ username, firstName, lastName, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/register`, { username, firstName, lastName, password })
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
        // token was likely bad
        // remove token, return to login page, and dispatch error
        cookie.remove('token', { path: '/' });
        dispatch(push('/login'));

        errorHandler(dispatch, error.response, AUTH_ERROR);
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
};
