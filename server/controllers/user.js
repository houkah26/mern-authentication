const User = require('../models/users'),
      helperFunctions = require('./helperFunctions');

//========================================
// User Info Route
//========================================
exports.getInfo = (req, res) => {
  userInfo = helperFunctions.setUserInfo(req.user);

  res.status(200).json({
    user: userInfo
  });
}

//========================================
// User Cash Route
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

          const userInfo = helperFunctions.setUserInfo(user);
          
          // respond with updated user
          res.status(200).json({
            user: userInfo
          });
        })
      }
  });
}