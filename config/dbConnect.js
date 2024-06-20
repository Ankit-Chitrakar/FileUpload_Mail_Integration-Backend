const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log(`DB connected sucessfully`);
    }).catch((err)=>{
        console.log(err);
        console.error(err.message);
        process.exit(1);
    })
}

module.exports = dbConnect;