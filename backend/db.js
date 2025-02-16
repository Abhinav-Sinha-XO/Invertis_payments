const mongoose = require("mongoose")
require('dotenv').config()

const validateMongoURI = (uri) => {
  if (!uri) return false;
  return uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://');
};

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!validateMongoURI(uri)) {
      console.error('Invalid MongoDB URI:', {
        hasURI: !!uri,
        startsWithValidScheme: validateMongoURI(uri)
      });
      throw new Error('Invalid MongoDB connection string format');
    }

    const options = {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 10
    };

    await mongoose.connect(uri, options);
    console.log('MongoDB connected successfully');

    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
      if (process.env.NODE_ENV === 'production') {
        console.log('Attempting to reconnect to MongoDB...');
        mongoose.connect(uri, options);
      }
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
      if (process.env.NODE_ENV === 'production') {
        mongoose.connect(uri, options);
      }
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (process.env.NODE_ENV === 'production') {
      console.log('Retrying connection in 5 seconds...');
      setTimeout(() => connectDB(), 5000);
    } else {
      throw error;
    }
  }
};

// Schemas
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  }
});

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

// Models
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = { connectDB, User, Account };