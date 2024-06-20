const nodemailer = require('nodemailer');
require('dotenv').config();

exports.transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.MAIL_PORT, // Ensure the port is also provided in the .env file
    secure: process.env.MAIL_PORT == 465, // Use true if port is 465, false otherwise
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
