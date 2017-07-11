const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

//================================
// Portfolio Schema
//================================
const PortfolioSchema = new Schema({
  // Stock ticker name
  stockName: {
    type: String,
    uppercase: true,
    unique: true,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  totalShares: {
    type: Number,
    min: 0,
    required: true
  }
});

module.exports = PortfolioSchema;