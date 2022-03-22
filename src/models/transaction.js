const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
    required: true
  },
  category: {
    type: Array,
  },
  date: {
    type: String,
  },
  merchant_name: {
    type: String,
  },
  is_selected: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);