import { round } from "lodash";

// Calculate Total Value of Entire Portfolio
export const calcTotalValue = portfolio => {
  let total = 0;
  portfolio.forEach(stock => {
    total += stock.total;
  });
  return round(total, 2).toFixed(2);
};

// Round prices to two decimals
export const roundPrices = stockData => {
  return stockData.map(stock => {
    stock.price = round(stock.price, 2).toFixed(2);
    stock.total = round(stock.total, 2).toFixed(2);
    return stock;
  });
};
