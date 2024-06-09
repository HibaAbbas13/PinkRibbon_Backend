const multer = require('multer');
const path = require('path');

// Set storage engine for TransactionImage
const transactionImageStorage = multer.diskStorage({
  destination: './uploads/transactions',
  filename: (req, file, cb) => {
    cb(null, 'transaction-' + Date.now() + path.extname(file.originalname));
  }
});

// Set storage engine for ProfileImage
const profileImageStorage = multer.diskStorage({
  destination: './uploads/profiles',
  filename: (req, file, cb) => {
    cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload for TransactionImage
const uploadTransactionImage = multer({
  storage: transactionImageStorage,
  limits: { fileSize: 1000000 }, // limit to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('TransactionImage'); // Assuming the form field name is 'TransactionImage'

// Init upload for ProfileImage
const uploadProfileImage = multer({
  storage: profileImageStorage,
  limits: { fileSize: 1000000 }, // limit to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('ProfileImage'); // Assuming the form field name is 'ProfileImage'

// Check file type
function checkFileType(file, cb) {
  cb(null, true);
}

module.exports = {
  uploadTransactionImage,
  uploadProfileImage
};