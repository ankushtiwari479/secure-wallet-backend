// Import required modules and libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Wallet = require('./db/models/Wallet');
const Transaction = require('./db/models/Transaction');
const db = require('./db/db')
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())

   app.get('/',async (req,res)=>{
    res.status(200).json({message:"sucess"})
  })
  
  // API endpoints
  app.post('/setup', async (req, res) => {
    try {
      const { balance, name } = req.body;
      const wallet = new Wallet({ balance, name });
      await wallet.save();
      res.status(200).json({
        id: wallet._id,
        balance: wallet.balance,
        name: wallet.name,
        date: wallet.date,
      });
    } catch (error) {
      console.log("error",error)
      res.status(500).json({ error: 'Error setting up wallet' });
    }
  });
  
  app.post('/transact/:walletId', async (req, res) => {
    try {
      const { walletId } = req.params;
      const { amount, description } = req.body;
  
      const wallet = await Wallet.findById(walletId);
  
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }
  
      const type = amount > 0 ? 'CREDIT' : 'DEBIT';
  
      const transaction = new Transaction({
        walletId: wallet._id,
        amount,
        description,
        balance: wallet.balance + amount,
        type,
      });
  
      wallet.balance += amount;
  
      await Promise.all([transaction.save(), wallet.save()]);
  
      res.status(200).json({
        balance: wallet.balance,
        transactionId: transaction._id,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error processing transaction' });
    }
  });
  
  app.get('/transactions', async (req, res) => {
    const { walletId, skip, limit } = req.query;
    try {
      const transactions = await Transaction.find({ walletId })
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 10);
  
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching transactions' });
    }
  });
  
  app.get('/wallet/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const wallet = await Wallet.findById(id);
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }
      res.status(200).json(wallet);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching wallet details' });
    }
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
