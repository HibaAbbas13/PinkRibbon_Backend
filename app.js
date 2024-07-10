const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/connectdb.js');
const userRoutes = require('./routes/userRoutes.js');
const VideoRoutes = require('./routes/VideoRoutes.js');
const transactionRoutes = require('./routes/Transaction.js');
const path = require('path');
const { uploadProfileImage } = require('./config/upload.js');
const UserController = require('./controllers/userController.js');


dotenv.config();
const app = express();
const port = process.env.PORT || 1489;
const DATABASE_URL = process.env.DATABASE_URL;
// CORS Policy
app.use(cors());
// Database Connection
connectDB(DATABASE_URL);
// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware
app.use(express.json());
// Routes
app.use("/api/user", userRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/video', VideoRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});