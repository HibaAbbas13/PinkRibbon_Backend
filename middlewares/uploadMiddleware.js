const multer = require('multer');

// Configure multer to specify storage options
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Define middleware function to handle file uploads
const uploadMiddleware = upload.single('image'); // 'image' is the name attribute of the file input field

module.exports = uploadMiddleware;
