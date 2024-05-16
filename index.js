const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/connectdb.js');
const userRoutes = require('./routes/userRoutes.js');
const imageRoute = require('./routes/imageRoute.js');
const multer = require('multer');
const userProfileRoutes = require('./routes/userprofileRoutes');
dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS Policy
app.use(cors());

// Database Connection
connectDB(DATABASE_URL);

// Multer Configuration
const upload = multer({ dest: 'uploads/' });

// JSON parsing
app.use(express.json());

// Load Routes
app.use("/api/user", userRoutes);
app.use('/api/image', imageRoute); // Use Multer middleware here
app.use('/api/userprofile', userprofileRoutes);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})