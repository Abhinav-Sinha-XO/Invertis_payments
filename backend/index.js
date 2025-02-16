require('dotenv').config();
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");
const helmet = require('helmet');
const {connectDB} = require('./db')

const app = express();

// Security middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(helmet());

// Routes
app.use("/api/v1", rootRouter);
app.use('/api/v1/accounts', require('./routes/accounts'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Initialize server with database connection
const startServer = async () => {
  try {
    await connectDB();
    
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
      }
      console.error('Server error:', error);
    });

  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  if (process.env.NODE_ENV === 'development') {
    process.exit(1);
  }
});

// Start the server
startServer();