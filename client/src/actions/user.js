import axios from 'axios';
import cookie from 'react-cookie';

import {
  UPDATE_USER
} from './types';
import { API_URL } from '../constants';

//= =====================
// User Action Creators
//= =====================
export function addFunds(fundAmount) {
  return function (dispatch) {
    const headers = { headers: { Authorization: cookie.load('token') } };

    axios.put(`${API_URL}/user/add-funds`, fundAmount, headers)
      .then(response => {
        dispatch({
          type: UPDATE_USER,
          user: response.data.user
        })
      })
      .catch(error => {
        console.log(error);
      })

  }
}