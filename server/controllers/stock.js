const axios = require('axios'),
      User = require('../models/users'),
      setUserInfo = require('./helperFunctions').setUserInfo,
      stockAPIkey = require('../config/main').stockAPIkey;

//========================================
// Get stock price for stock routes
//========================================
exports.fetchStockPrice = (req, res, next) => {
  const symbol = req.body.stockName;

  axios.get(stockAPIurl(symbol, stockAPIkey))
    .then(response => {
      res.locals.stockPrice = lastPrice(response.data);
      next();
    })
    .catch(error => {
      next(error);
    })
}

//========================================
// Buy Stock Route for User
//========================================
exports.buyStock = (req, res, next) => {
  // Convert transaction values to desired format/types
  const transaction = parseTransaction(req.body);

  // Set price on transaction passed from previous middleware
  transaction.price = res.locals.stockPrice;

  const { shares, price, action } = transaction;

  // Check for appropriate action type
  if (action !== 'BUY') {
    return res.status(409).send({ message: 'Invalid transaction type' });
  }

  // Check for valid number of shares
  if (shares <= 0) {
    return res.status(409).send({ message: 'Invalid transaction' });
  }

  User.findById(req.user._id, (err, user) => {
      if (err) {
        return next(err);
      } else {

        // Calculate cost of transaction
        const transactionCost = shares * price;

        // Check if user has enough funds
        if (user.cash < transactionCost) {
          return res.status(409).send({ message: 'Insufficient funds' });
        }

        // Subtract transaction cost from user's cash
        user.cash -= transactionCost;

        // Add transaction to user's history
        user.transactionHistory.push(transaction);

        // Add stock to user's portfolio
        updatePortfolio(user.portfolio, transaction);

        user.save((err, user) => {
          if (err) { return next(err); }

          const userInfo = setUserInfo(user);
          
          // respond with updated user
          res.status(200).json({
            user: userInfo
          });
        })
      }
  });
}

//========================================
// Sell Stock Route for User
//========================================
exports.sellStock = (req, res, next) => {
// Convert transaction values to desired format/types
const transaction = parseTransaction(req.body);

// Set price on transaction passed from previous middleware
transaction.price = res.locals.stockPrice;

const { shares, price, action } = transaction;

  // Check for appropriate action type
  if (action !== 'SELL') {
    return res.status(409).send({ message: 'Invalid transaction type' });
  }

  // Check for valid number of shares
  if (shares <= 0) {
    return res.status(409).send({ message: 'Invalid transaction' });
  }


  User.findById(req.user._id, (err, user) => {
      if (err) {
        return next(err);
      } else {

        // Check if user has enough shares
        if (!hasEnoughShares(user.portfolio, stockName, shares)) {
          return res.status(409).send({ message: 'Invalid transaction' });
        }
        
        // Calculate cost of transaction
        const transactionCost = shares * price;

        // Add transaction cost to user's cash
        user.cash += transactionCost;

        // Add transaction to user's history
        user.transactionHistory.push(transaction);

        // Update user's portfolio
        updatePortfolio(user.portfolio, transaction);

        user.save((err, user) => {
          if (err) { return next(err); }

          const userInfo = setUserInfo(user);
          
          // respond with updated user
          res.status(200).json({
            user: userInfo
          });
        })
      }
  });
}

//========================================
// Helper Functions
//========================================

// check if stock exists in portfolio
const containsStock = (portfolio, stockName) => {
  return portfolio.some(stock => stock.stockName === stockName);
}

// update stock portfolio
const updatePortfolio = (portfolio, transaction) => {
  const { stockName, displayName, action, shares } = transaction;

  // Check if user already own's stock
  if (containsStock(portfolio, stockName)) {
    // updated number of shares for given stock
    updateStock(portfolio, stockName, shares, action);
  } else if (action === 'BUY') {
    // If user doesn't own, add stock to user's prortfolio
    const stockToAdd = {
      stockName: stockName,
      displayName: displayName,
      totalShares: shares
    };
    portfolio.push(stockToAdd);
  }
}

// update portfolio when user owns stock already
const updateStock = (portfolio, stockName, shares, action) => {
  portfolio.map(stock => {
    if (stock.stockName = stockName) {
      // updated number of shares for matched stock
      if (action === 'BUY') {
        stock.totalShares += shares;
      } else if (action === 'SELL') {
        stock.totalShares -= shares;
      }
      return stock;
    } else {
      return stock;
    }
  });
}

// Convert transaction values to desired format
const parseTransaction = (transaction) => {
  transaction.shares = parseInt(transaction.shares);
  transaction.stockName = transaction.stockName.toUpperCase();
  transaction.action = transaction.action.toUpperCase();

  return transaction;
}

// Check if user has enough shares
const hasEnoughShares = (portfolio, stockName, shares) => {
  return portfolio.some(stock => {
    // return true if stock matches and there are enough shares for transaction
    return stock.stockName === stockName && stock.totalShares >= shares;
  });
}

// Stock API url
const stockAPIurl = (symbol, apiKey) => {
  return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;
}

// Extract last closing price from stock data
const lastPrice = (data) => {
  const lastRefreshed = data["Meta Data"]["3. Last Refreshed"];

  const closingPrice = data["Time Series (1min)"][lastRefreshed]["4. close"];

  return parseFloat(closingPrice);
}