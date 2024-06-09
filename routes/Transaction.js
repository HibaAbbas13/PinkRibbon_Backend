const express = require('express');
// Import multer config
const{upload, TransactionController }= require('../controllers/Transaction_Controller.js'); 
const authMiddleware =require( '../middlewares/auth-middleware.js');
const { uploadTransactionImage } = require('../config/upload.js');
const router = express.Router();

router.post('/upload', authMiddleware.checkUserAuth, uploadTransactionImage, TransactionController.uploadtransaction);

// Route to get an image by ID
router.get('/', TransactionController.gettransaction);


module.exports = router;
