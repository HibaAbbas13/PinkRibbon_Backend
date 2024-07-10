const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    secure:false,
    port: 587,
    auth: {
        user:'hibaabbas1306@gmail.com',
        pass:'libg laji nkix xexn',
    }
});

module.exports = transporter;
