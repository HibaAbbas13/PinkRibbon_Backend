const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming your user model is named 'User'
    required: true
  },
  amount: Number,
  username: String,
  useraccount: String,
  TransactionImage: {
    imagename: String,
    path: String,
    imageData: Buffer, // Store the image binary data
    imageContentType: String // Store the image content type (e.g., 'image/jpeg')
  }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
