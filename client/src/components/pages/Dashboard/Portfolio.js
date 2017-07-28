import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookie";
import { round } from "lodash";

import { calcTotalValue } from "./helperFunctions";
import { API_URL } from "../../../constants";

import Loading from "../../loading";
import Table from "../../table";
import NoStockInPortfolio from "./NoStockInPortfolio";

const tableHeaders = [
  { name: "Symbol", key: "stockSymbol" },
  { name: "Name", key: "stockName" },
  { name: "Shares", key: "totalShares" },
  { name: "Price Per Share ($)", key: "price", sortKey: "priceNum" },
  { name: "Total Value ($)", key: "total", sortKey: "totalNum" }
];

export default class Portfolio extends Component {
  state = {
    portfolio: null,
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

        // round prices & set alt sorting values
        const portfolio = mapPortfolio(response.data.portfolio);

        this.setState({
          portfolio: portfolio,
          totalValue: totalValue.toFixed(2)
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderPortfolio = () => {
    const { portfolio, totalValue } = this.state;
    const tableFooter = [null, null, null, "Total", totalValue];

    if (portfolio === null) {
      return <Loading />;
    } else if (portfolio.length === 0) {
      return <NoStockInPortfolio />;
    } else {
      return (
        <Table
          tableData={portfolio}
          tableHeaders={tableHeaders}
          tableFooter={tableFooter}
        />
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderPortfolio()}
      </div>
    );
  }
}

const mapPortfolio = portfolio => {
  return portfolio.map(stock => {
    // Copy price and total for sorting with sortKey
    stock.priceNum = stock.price;
    stock.totalNum = stock.total;

    stock.price = round(stock.price, 2).toFixed(2);
    stock.total = round(stock.total, 2).toFixed(2);
    return stock;
  });
};
