const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/imageController.js');
const uploadMiddleware = require('../middlewares/uploadMiddleware.js'); // Corrected path

router.post('/uploadimage', uploadMiddleware, ImageController.uploadimage);

module.exports = router;
