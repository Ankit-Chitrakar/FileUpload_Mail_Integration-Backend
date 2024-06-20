const mongoose = require('mongoose');
const {transporter} = require('../config/nodemailerConnect');
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    tags: {
       type: String 
    },
    fileURL: {
        type: String,
    }
});

// post middleware 
// when a new file just createed just after send a mail to that email id that you have uploaded a file
// alawys use this before declaration of model

fileSchema.post("save", async (doc) => {
    try {
        console.log(doc);
        const info = await transporter.sendMail({
            from: process.env.MAIL_USER, // sender address
            to: doc.email, // receiver's email
            subject: "Uploaded New File ✔", // Subject line
            text: `${doc.name}, you have successfully uploaded a file on the server😎😎`, // plain text body
            html: `<h3>Hey there!</h3> <p>View here: <a href="${doc.fileURL}">${doc.fileURL}</a></p>`, // html body
        });

        console.log('Email sent:', info);
    } catch (err) {
        console.error('Error sending email:', err);
    }
});


module.exports = mongoose.model("File", fileSchema);