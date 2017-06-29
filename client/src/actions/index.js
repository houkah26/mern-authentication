import cookie from 'react-cookie';
import axios from 'axios';
import { push } from 'react-router-redux';
import { has as _has } from 'lodash';

import {  AUTH_USER,  
          AUTH_ERROR,
          UNAUTH_USER,
          PROTECTED_TEST } from './types';
import { API_URL } from '../constants';

function errorHandler(dispatch, error, type) {
  console.log(error);
   
  let errorMessage; 
  // check for error message otherwise set as network error
  if (_has(error, 'response.data.message')) {
    errorMessage = error.response.data.message;
  } else {
    errorMessage = 'Network Error: Please wait and try again.';
  }

  if(error.status === 401) {
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

export function loginUser({ email, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then(response => {
      loginHandler(dispatch, response.data.token, response.data.user);
    })
    .catch((error) => {
      errorHandler(dispatch, error, AUTH_ERROR)
    });
    }
  }

export function registerUser({ email, firstName, lastName, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
    .then(response => {
      loginHandler(dispatch, response.data.token, response.data.user);
    })
    .catch((error) => {
      errorHandler(dispatch, error, AUTH_ERROR)
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
  return function(dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function changeRoute(route) {
  return function(dispatch) {
    dispatch(push(route));
  }
};

export function clearAuthErrors() {
  return function(dispatch) {
    dispatch({
      type: AUTH_ERROR,
      payload: ''
    })
  }
}