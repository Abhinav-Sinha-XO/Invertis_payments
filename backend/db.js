const mongoose = require("mongoose")
require('dotenv').config()

const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 10
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('MongoDB connected successfully');

    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};



const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    minlength:3,
    maxlength:30
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  firstname:{
    type:String,
    required:true,
    trim:true,
    maxlenght:50
  },
  lastname:{
    type:String,
    required:true,
    trim:true,
    maxlength:50
  }})

const accountSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  balance:{
    type:Number,
    required:true
  }
})



const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account',accountSchema)


module.exports = { User, Account, connectDB }