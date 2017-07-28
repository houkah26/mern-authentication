import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookie";
import { round } from "lodash";

import { API_URL } from "../../../constants";

import Loading from "../../loading";
import SellStockForm from "../../../components/form/SellStockForm";
import NoStockInPortfolio from "./NoStockInPortfolio";

export default class SellStock extends Component {
  state = {
    portfolio: null
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

  renderSellStockForm = () => {
    const { portfolio } = this.state;

    if (portfolio === null) {
      return <Loading />;
    } else if (portfolio.length === 0) {
      return <NoStockInPortfolio />;
    } else {
      return <SellStockForm portfolio={portfolio} />;
    }
  };

  render() {
    return (
      <div>
        {this.renderSellStockForm()}
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
