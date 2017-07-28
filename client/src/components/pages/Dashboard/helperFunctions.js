import { round } from "lodash";

// Calculate Total Value of Entire Portfolio
export const calcTotalValue = portfolio => {
  let total = 0;
  portfolio.forEach(stock => {
    total += stock.total;
  });
  return round(total, 2);
};
