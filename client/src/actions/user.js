import axios from "axios";
import cookie from "react-cookie";
import { push } from "react-router-redux";

import errorHandler from "./errorHandler";
import { UPDATE_USER, ERROR } from "./types";
import { API_URL } from "../constants";

//= =====================
// User Action Creators
//= =====================
export function addFunds(fundAmount) {
  return function(dispatch) {
    const headers = { headers: { Authorization: cookie.load("token") } };

    axios
      .put(`${API_URL}/user/add-funds`, { fundAmount }, headers)
      .then(response => {
        // Update user
        dispatch({
          type: UPDATE_USER,
          user: response.data.user
        });
      })
      .catch(error => {
        console.log(error.response);

        errorHandler(dispatch, error.response, ERROR);
      });
  };
}

export function buyStock(stockSymbol, shares) {
  return function(dispatch) {
    const reqBody = {
      stockSymbol,
      shares,
      action: "BUY"
    };
    const headers = { headers: { Authorization: cookie.load("token") } };

    axios
      .post(`${API_URL}/user/stock/buy`, reqBody, headers)
      .then(response => {
        // Update user
        dispatch({
          type: UPDATE_USER,
          user: response.data.user
        });

        // Reroute to portfolio
        dispatch(push("/dashboard/portfolio"));
      })
      .catch(error => {
        console.log(error.response);

        errorHandler(dispatch, error.response, ERROR);
      });
  };
}

export function sellStock(stockSymbol, shares) {
  return function(dispatch) {
    const reqBody = {
      stockSymbol,
      shares,
      action: "SELL"
    };
    const headers = { headers: { Authorization: cookie.load("token") } };

    axios
      .post(`${API_URL}/user/stock/sell`, reqBody, headers)
      .then(response => {
        // Update user
        dispatch({
          type: UPDATE_USER,
          user: response.data.user
        });

        // Reroute to portfolio
        dispatch(push("/dashboard/portfolio"));
      })
      .catch(error => {
        console.log(error.response);

        errorHandler(dispatch, error.response, ERROR);
      });
  };
}
