const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,        
        pass: process.env.EMAIL_PASS    
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;