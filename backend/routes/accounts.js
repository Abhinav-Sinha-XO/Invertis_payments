const express = require('express')
const router = express.Router()
const {signupBody,signinBody,updateBody} = require('../zod')
const { User, Account } = require('../db')
require('dotenv').config()
const jwt = require("jsonwebtoken")
const { authMiddleware } = require('../middleware')
const mongoose = require('mongoose');



router.get('/balance', authMiddleware, async (req,res)=>{
  const userId = req.userId
  const account = await Account.findOne({userId})
  if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }res.json({
    balance:account.balance
  })
 })

router.post('/transfer', authMiddleware, async(req, res) => {
  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();
    const { amount, to } = req.body;

    if (to === req.userId) {
      throw new Error("Cannot transfer to yourself");
    }

    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if(!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account"
      });
    }

    await Account.findOneAndUpdate(
      {userId: req.userId},
      {$inc: {balance: -amount}},
      {session}
    );
    
    await Account.findOneAndUpdate(
      {userId: to},
      {$inc: {balance: amount}},
      {session}
    );

    await session.commitTransaction();
    res.json({
      message: "Transfer successful"
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      message: error.message || "Transfer failed"
    });
  } finally {
    session.endSession();
  }
});



module.exports = router



