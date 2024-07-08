const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jaiden.cummerata69@ethereal.email',
        pass: 'jVTe4Xj5cPWmwYZANR'
    }
});

module.exports = transporter;
