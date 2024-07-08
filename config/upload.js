const multer = require('multer');
const path = require('path');

const transactionImageStorage = multer.diskStorage({
  destination: './uploads/transactions',
  filename: (req, file, cb) => {
    cb(null, 'transaction-' + Date.now() + path.extname(file.originalname));
  }
});


const profileImageStorage = multer.diskStorage({
  destination: './uploads/profiles',
  filename: (req, file, cb) => {
    cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
  }
});


const uploadTransactionImage = multer({
  storage: transactionImageStorage,
  limits: { fileSize: 1000000 }, 
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('TransactionImage'); 


const uploadProfileImage = multer({
  storage: profileImageStorage,
  limits: { fileSize: 1000000 }, // limit to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('ProfileImage'); 

function checkFileType(file, cb) {
  cb(null, true);
}

module.exports = {
  uploadTransactionImage,
  uploadProfileImage
};