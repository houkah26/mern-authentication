import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookie";
import { round } from "lodash";

import { API_URL } from "../../../constants";

import Loading from "../../loading";
import Table from "../../table";

const tableHeaders = [
  { name: "Symbol", key: "stockSymbol" },
  { name: "Name", key: "stockName" },
  { name: "Shares", key: "totalShares" },
  { name: "Price Per Share ($)", key: "price" },
  { name: "Total Value ($)", key: "total" }
];

export default class Portfolio extends Component {
  state = {
    portfolio: [],
    totalValue: 0
  };

  componentDidMount() {
    this.fetchPortfolio();
  }

  fetchPortfolio = () => {
    const token = cookie.load("token");

    axios
      .get(`${API_URL}/user/portfolio`, {
        headers: { Authorization: token }
      })
      .then(response => {
        // calculate total value
        const totalValue = calcTotalValue(response.data.portfolio);

        // round prices to two decimals
        const portfolio = roundPrices(response.data.portfolio);

        this.setState({
          portfolio: portfolio,
          totalValue: totalValue
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { portfolio, totalValue } = this.state;
    const tableFooter = [null, null, null, "Total", totalValue];

    return (
      <div>
        {portfolio.length === 0
          ? <Loading />
          : <Table
              tableData={portfolio}
              tableHeaders={tableHeaders}
              tableFooter={tableFooter}
            />}
      </div>
    );
  }
}

// Round prices to two decimals
const roundPrices = stockData => {
  return stockData.map(stock => {
    stock.price = round(stock.price, 2).toFixed(2);
    stock.total = round(stock.total, 2).toFixed(2);
    return stock;
  });
};

// Calculate Total Value of Entire Portfolio
const calcTotalValue = portfolio => {
  let total = 0;
  portfolio.forEach(stock => {
    total += stock.total;
  });
  return round(total, 2).toFixed(2);
};
