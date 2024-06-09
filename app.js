const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/connectdb.js');
const userRoutes = require('./routes/userRoutes.js');
const transactionRoutes = require('./routes/Transaction.js');
const path = require('path');
const { uploadProfileImage } = require('./config/upload.js');
const UserController = require('./controllers/userController.js');


dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS Policy
app.use(cors());

// Database Connection
connectDB(DATABASE_URL);
// Multer Configuration
//app.use('/uploads', express.static('uploads'));
//router.post('/upload', upload.single('file'), ImageController.uploadImage);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//app.post('/update', upload, UserController.updateUserInfo);


app.use(express.json());
app.use("/api/user", userRoutes);
app.use('/api/transaction', transactionRoutes);
//app.use('/api/profileimage', profileimageRoute);
app.post('/api/user/update-profile', uploadProfileImage, UserController.updateUserInfo);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
