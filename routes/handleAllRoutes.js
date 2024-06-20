const express = require('express');
const { imageUpload } = require('../controller/imageUpload');
const { videoUpload } = require('../controller/videoUpload');
const { imageCompressUpload } = require('../controller/imageCompressUpload');
const { videoCompressUpload } = require('../controller/videoCompressUpload');
const router = express.Router();

router.post('/media/upload/image', imageUpload);
router.post('/media/upload/video', videoUpload);
router.post('/media/upload/image/compress', imageCompressUpload);
router.post('/media/upload/video/compress', videoCompressUpload);

module.exports = router;