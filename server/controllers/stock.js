const axios = require('axios'),
      User = require('../models/users'),
      setUserInfo = require('./helperFunctions').setUserInfo;

//========================================
// Get stock price for stock routes
//========================================
exports.fetchStockPrice = (req, res, next) => {
  const symbol = req.body.stockSymbol.toUpperCase();

  axios.get(`http://download.finance.yahoo.com/d/quotes.csv?f=snl1&s=${symbol}`)
    .then(response => {
      const data = response.data.split(',');

      res.locals.symbol = data[0].slice(1, -1);
      res.locals.name = data[1].slice(1, -1);
      res.locals.price = parseFloat(data[2]);

      // Return error message if price is not a number
      if (isNaN(res.locals.price)) {
        return res.status(409).send({ message: 'Invalid stock symbol' });
      }

      next();
    })
    .catch(error => {
      next(error);
    })
}

//========================================
// Quote Stock Route for User
//========================================
exports.quoteStock = (req, res, next) => {
  res.status(200).json({
    symbol: res.locals.symbol,
    name: res.locals.name,
    price: res.locals.price
  })
}

//========================================
// Buy Stock Route for User
//========================================
exports.buyStock = (req, res, next) => {
  // Convert transaction values to desired format/types
  const transaction = parseTransaction(req.body);

  // Set price & symbol on transaction passed from previous middleware
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

          const userInfo = setUserInfoForResponse(user);
          
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
        if (!hasEnoughShares(user.portfolio, stockSymbol, shares)) {
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

          const userInfo = setUserInfoForResponse(user);
          
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
const containsStock = (portfolio, stockSymbol) => {
  return portfolio.some(stock => stock.stockSymbol === stockSymbol);
}

// update stock portfolio
const updatePortfolio = (portfolio, transaction) => {
  const { stockSymbol, stockName, action, shares } = transaction;

  // Check if user already own's stock
  if (containsStock(portfolio, stockSymbol)) {
    // updated number of shares for given stock
    updateStock(portfolio, stockSymbol, shares, action);
  } else if (action === 'BUY') {
    // If user doesn't own, add stock to user's prortfolio
    const stockToAdd = {
      stockSymbol: stockSymbol,
      stockName: stockName,
      totalShares: shares
    };
    portfolio.push(stockToAdd);
  }
}

// update portfolio when user owns stock already
const updateStock = (portfolio, stockSymbol, shares, action) => {
  portfolio.map(stock => {
    if (stock.stockSymbol = stockSymbol) {
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
  transaction.stockSymbol = transaction.stockSymbol.toUpperCase();
  transaction.action = transaction.action.toUpperCase();

  return transaction;
}

// Check if user has enough shares
const hasEnoughShares = (portfolio, stockSymbol, shares) => {
  return portfolio.some(stock => {
    // return true if stock matches and there are enough shares for transaction
    return stock.stockSymbol === stockSymbol && stock.totalShares >= shares;
  });
}