import axios from "axios";
import cookie from "react-cookie";
import { push } from "react-router-redux";

import { UPDATE_USER } from "./types";
import { API_URL } from "../constants";

//= =====================
// User Action Creators
//= =====================
export function addFunds(fundAmount) {
  return function(dispatch) {
    const headers = { headers: { Authorization: cookie.load("token") } };

    console.log(fundAmount);

    axios
      .put(`${API_URL}/user/add-funds`, fundAmount, headers)
      .then(response => {
        dispatch({
          type: UPDATE_USER,
          user: response.data.user
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function buyStock(stockSymbol, shares) {
  return function(dispatch) {
    const headers = { headers: { Authorization: cookie.load("token") } };
    const reqBody = {
      stockSymbol,
      shares,
      action: "BUY"
    };

    axios
      .post(`${API_URL}/user/stock/buy`, reqBody, headers)
      .then(response => {
        console.log(response.data);
        dispatch(push("/dashboard/portfolio"));
      })
      .catch(error => {
        console.log(error.response);
      });
  };
}
