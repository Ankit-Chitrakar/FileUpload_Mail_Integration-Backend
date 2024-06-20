const File = require('../model/fileSchema');
const cloudinary = require('cloudinary').v2;

const isMyFileSupported = (myFileType, validTypeList) => {
    return validTypeList.includes(myFileType);
}

const uploadToCloudinary = async (file, folder, quality = 100) => {
    const options = {
        folder,
        resource_type: "auto",
        quality
    };

    return await cloudinary.uploader.upload(file, options);
};


const imageUpload = async (req, res)=>{
    try{
        
        // firts fetch the file from the req body
        const file = req.files.file;

        // then fetch all others from req body
        const {name, email, tags} = req.body;

        // then validate the file if the extention are valid or not
        const validTypeList = ["jpg", "jpeg", "png"];

        const myFileType = file.name.split('.')[1].toLowerCase();

        if(!isMyFileSupported(myFileType, validTypeList)){
            return res.status(400).json({
                success: false,
                message: "File type are not supported",
            });
        }

        // my file are valid file 
        // store it to Cloudinary

        const folder = "Ankit";
        const response = await uploadToCloudinary(file.tempFilePath, folder);

        if(!response){
            return res.status(401).json({
                success: false,
                message: "Cloudinary problem",
            })
        }

        // upload to clodinary succesfully now store it on DB
        const fileData = await File.create({
            name,
            email,
            tags, 
            fileURL: response.secure_url,
        })

        res.status(201).json({
            success: true,
            file: fileData,
            message: "Uploaded to DB successfully",
        });


    }catch(err){
        console.log(err);
        res.status(501).json({
            success: false,
            message: "Koi aur dikkat hain",
        })
    }
}

module.exports = {imageUpload, isMyFileSupported, uploadToCloudinary};