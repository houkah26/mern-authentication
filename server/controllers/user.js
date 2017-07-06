const User = require('../models/users');

//========================================
// User Info Route
//========================================
exports.getInfo = (req, res) => {
  res.status(200).json({
    user: req.user
  });
}

//========================================
// User Cash Route
//========================================
