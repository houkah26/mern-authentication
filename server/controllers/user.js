const axios = require('axios'),
      User = require('../models/users'),
      helperFunctions = require('./helperFunctions');

//========================================
// User Info Route
//========================================
exports.getInfo = (req, res) => {
  userInfo = helperFunctions.setUserInfoForResponse(req.user);

  res.status(200).json({
    user: userInfo
  });
}

//========================================
// User Add Funds Route
//========================================
exports.addFunds = (req, res, next) => {
  const fundAmount = parseFloat(req.body.fundAmount);
  
  // Return error if fund amount is not valid
  if (isNaN(fundAmount) || fundAmount < 0) {
    return res.status(422).send({ message: 'You must enter a valid fund amount.'});
  }

  User.findById(req.user._id, (err, user) => {
      if (err) {
        return next(err);
      } else {
        // Update user cash amount by adding fund amount
        user.cash += fundAmount;

        user.save((err, user) => {
          if (err) { return next(err); }

          const userInfo = helperFunctions.setUserInfoForResponse(user);
          
          // respond with updated user
          res.status(200).json({
            user: userInfo
          });
        })
      }
  });
}

//========================================
// User Get History Routes
//========================================
exports.getHistory = (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
      if (err) {
        return next(err);
      } else {
        // respond with history
        res.status(200).json({
          history: user.transactionHistory
        });
      }
  });
}

//========================================
// User Portfolio Route, Get Current Stock Price and Respond with Portfolio
//========================================
exports.getPortfolio = (req, res, next) => {
  const portfolio = req.user.portfolio;
  const symbolsArray = portfolio.map(stock => stock.stockSymbol);
  const symbolsString = formatStockSymbols(symbolsArray);

  axios.get(`http://download.finance.yahoo.com/d/quotes.csv?f=sl1&s=${symbolsString}`)
    .then(response => {
      const dataArray = CSVToArray(response.data).slice(0, -1) ;
      
      const portfolioWithPrices = mapPrices(portfolio, dataArray);

      // respond with portfolio including current prices
      res.status(200).json({
        portfolio: portfolioWithPrices
      });
      
    })
    .catch(error => {
      next(error);
    })
}


//========================================
// Helper Functions
//========================================

// Format array of symbols and return string seperated by '+' (ie: 'MSFT+AAPL+AMZN')
const formatStockSymbols = (symbols) => {
  let symbolString = '';

  symbols.forEach((symbol, index, array) => {
    if (index < array.length - 1) {
      symbolString += symbol + '+';
    } else {
      symbolString += symbol;
    }
  })

  return symbolString;
}

// Map prices to portfolio
const mapPrices = (portfolio, priceArray) => {
  return portfolio.map(stock => {
    // convert mongoose doc to regular js object
    const stockWithPrice = stock.toObject()

    // Add price for matching symbol from priceArray
    priceArray.forEach(stockPrice => {
      if (stock.stockSymbol === stockPrice[0]) {
        stockWithPrice.price = parseFloat(stockPrice[1]);
        stockWithPrice.total = stockWithPrice.price * stockWithPrice.totalShares;
      }
    })
    return stockWithPrice;
  })
}

// Convert CSV to array
// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
const CSVToArray = (strData, strDelimiter) => {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}