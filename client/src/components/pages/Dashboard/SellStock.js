import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookie";
import { round } from "lodash";

import { API_URL } from "../../../constants";

import Loading from "../../loading";
import SellStockForm from "../../../components/form/SellStockForm";

export default class SellStock extends Component {
  state = {
    portfolio: []
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
        // round prices to two decimals
        const portfolio = roundPrices(response.data.portfolio);

        this.setState({
          portfolio: portfolio
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { portfolio } = this.state;

    return (
      <div>
        {portfolio.length === 0
          ? <Loading />
          : <SellStockForm portfolio={portfolio} />}
      </div>
    );
  }
}

// Round prices to two decimals
const roundPrices = stockData => {
  return stockData.map(stock => {
    stock.price = round(stock.price, 2);
    stock.total = round(stock.total, 2);
    return stock;
  });
};
