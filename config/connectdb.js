const mongoose = require('mongoose');

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "PinkRibbon",
      serverSelectionTimeoutMS: 30000 ,
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true
    };
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log('Connected to MongoDB successfully...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
