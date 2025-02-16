const mongoose = require("mongoose")
require('dotenv').config()

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const options = {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('MongoDB connected successfully');

    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
      if (process.env.NODE_ENV === 'production') {
        // In production, attempt to reconnect
        console.log('Attempting to reconnect to MongoDB...');
        mongoose.connect(process.env.MONGODB_URI, options);
      }
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
      if (process.env.NODE_ENV === 'production') {
        mongoose.connect(process.env.MONGODB_URI, options);
      }
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    // In production, we want to retry connection
    if (process.env.NODE_ENV === 'production') {
      console.log('Retrying connection in 5 seconds...');
      setTimeout(() => connectDB(), 5000);
    } else {
      throw error;
    }
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