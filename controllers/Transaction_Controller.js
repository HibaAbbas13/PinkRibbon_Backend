const Transaction= require('../models/Transaction');
const upload = require('../config/upload'); // Import multer config
const path = require('path');
const fs = require('fs');

class TransactionController {
    static uploadtransaction = async (req, res) => {
        try {
            const { user, amount, username, useraccount } = req.body;
            const { originalname, path: filePath, mimetype } = req.file;
            const transaction = new Transaction({
                user,
                amount,
                username,
                useraccount,
                TransactionImage: {
                    imagename: originalname,
                    path: filePath,
                    imageData: fs.readFileSync(filePath), // Read file as buffer
                    imageContentType: mimetype
                }
            });

            await transaction.save();

            res.status(201).json({ message: 'Transaction created successfully', transaction });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error creating transaction');
        }
    }

    static gettransaction = async (req, res) => {
        try {
            const transactions = await Transaction.find();

            if (!transactions || transactions.length === 0) {
                return res.status(404).json({ error: 'No transactions found' });
            }

            res.status(200).json(transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = { TransactionController };
