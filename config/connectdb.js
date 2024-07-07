const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.DATABASE_URL, {
     
      serverSelectionTimeoutMS: 5000 // Optional, shorter timeout
    });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;

