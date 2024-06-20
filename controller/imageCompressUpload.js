const File = require('../model/fileSchema');
const {isMyFileSupported, uploadToCloudinary} = require('../controller/imageUpload');

exports.imageCompressUpload = async (req, res)=>{
    try{
        
        // firts fetch the file from the req body
        const file = req.files.file;

        // then fetch all others from req body
        const {name, email, tags, compress} = req.body;

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
        const response = await uploadToCloudinary(file.tempFilePath, folder, compress);

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
