const express = require('express');
const app = express();
require('dotenv').config();

// Port defining
const port = process.env.PORT || 5000;

// add middleware 
app.use(express.json());

// express file upload middleware
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// add cloudinary middleware

// server starting
app.listen(port, ()=>{
    console.log(`Server started successfully at port: ${port}`)
})

// base route
app.get('/', (req, res)=>{
    res.send(`<h2>Hello This is File upload and mailing </h2>`)
})

// mounting routes
const handleAllRoutes = require('./routes/handleAllRoutes');
app.use('/api/v1', handleAllRoutes);

// connect to DB
const dbConnect = require('./config/dbConnect');


dbConnect();

// cloudinary Connect 
const { cloudinaryConnect } = require('./config/cloudinaryConnect');
cloudinaryConnect();


