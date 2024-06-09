const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'nettie.hilpert26@ethereal.email',
        pass: 'wp24kxqz6E5r16CpRd'
    }
});

module.exports = transporter;
