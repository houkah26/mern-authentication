import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookie";
import moment from "moment";
import { round } from "lodash";

import { API_URL } from "../../../constants";

import Loading from "../../loading";
import Table from "../../table";

const tableHeaders = [
  { name: "Date/Time", key: "createdAt" },
  { name: "Transaction", key: "action" },
  { name: "Symbol", key: "stockSymbol" },
  { name: "Name", key: "stockName" },
  { name: "Shares", key: "shares" },
  { name: "Price ($)", key: "price" },
  { name: "Total ($)", key: "totalValue" }
];

export default class History extends Component {
  state = {
    history: []
  };

  componentDidMount() {
    this.fetchHistory();
  }

  fetchHistory = () => {
    const token = cookie.load("token");

    axios
      .get(`${API_URL}/user/history`, {
        headers: { Authorization: token }
      })
      .then(response => {
        // Format date/time, add total value, and round prices
        const history = mapHistory(response.data.history);
        this.setState({ history: history });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { history } = this.state;

    return (
      <div>
        {history.length === 0
          ? <Loading />
          : <Table tableData={history} tableHeaders={tableHeaders} />}
      </div>
    );
  }
}

// Add created at and total value to history, and format prices to two decimal places
const mapHistory = history => {
  return history.map(transaction => {
    // set Unix time stamp for sorting
    transaction.unixTimestamp = moment(transaction.createdAt).unix();

    // convert created at date/time to "M/D/YY, X:XX AM/PM"
    transaction.createdAt = moment(transaction.createdAt).format("M/D/YY, LT");

    // total cost of transaction
    const totalValue = transaction.price * transaction.shares;

    // convert prices to two decimal places
    transaction.totalValue = round(totalValue, 2).toFixed(2);
    transaction.price = round(transaction.price, 2).toFixed(2);

    return transaction;
  });
};
