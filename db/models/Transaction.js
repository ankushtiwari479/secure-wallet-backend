const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    walletId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    description: String,
    balance: Number,
    date: { type: Date, default: Date.now },
    type: String, // 'CREDIT' or 'DEBIT'
  });



  const Transaction = mongoose.model('Transaction', TransactionSchema);

  module.exports = Transaction