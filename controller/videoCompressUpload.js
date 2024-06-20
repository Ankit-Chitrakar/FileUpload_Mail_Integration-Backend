const File = require('../model/fileSchema');
const {isMyFileSupported, uploadToCloudinary} = require('../controller/imageUpload');

exports.videoCompressUpload = async (req, res) =>{
    try{
        // fetch file firts
        const file = req.files.file;
        const {name, email, tags, compress} = req.body;

        const supportedTypeList = ["mov", "mp4", "mkv"];

        const myFileType = file.name.split('.')[1].toLowerCase();

        if(!isMyFileSupported(myFileType, supportedTypeList)){
            return res.status(400).json({
                success: false,
                message: "File not supported",
            })
        }

        // file supported 
        // now upload to cloudinary
        const response = await uploadToCloudinary(file.tempFilePath, "Ankit", compress);

        if(!response || response === undefined){
            return res.status(401).json({
                sucess: false,
                message: "unable to upload file in cloudinary",
            })
        }

        // file uploaded to cloudinary
        // now save to DB
        const fileData = await File.create({
            name,
            email,
            tags,
            fileURL: response.secure_url,
        });

        res.status(201).json({
            success: true,
            data: fileData,
            message: "File uploaded to DB successfully",
        });

    }catch(err){
        console.log(err);
        res.status(501).json({
            success: false,
            message: "Koi aur dikkat hain",
        })
    }
}
