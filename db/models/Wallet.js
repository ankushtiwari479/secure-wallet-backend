const mongoose = require('mongoose');
const WalletSchema = new mongoose.Schema({
    balance: Number,
    name: String,
    date: { type: Date, default: Date.now },
  });


const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
