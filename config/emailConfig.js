const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'hibaabbas1306@gmail.com',
        pass: 'hihi9876.'
    }
});

module.exports = transporter;
