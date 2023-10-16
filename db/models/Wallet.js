const mongoose = require('mongoose');
const WalletSchema = new mongoose.Schema({
    balance: Number,
    name: {type: String, unique:true},
    date: { type: Date, default: Date.now },
  });


const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
