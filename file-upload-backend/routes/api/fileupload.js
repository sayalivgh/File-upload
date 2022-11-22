const express = require('express');
const router = express.Router();
const fileUploadController = require('../../controllers/fileUploadController');
router.route('/')
.get(fileUploadController.getAllUploadedList)
.post(fileUploadController.uploadFile)
// .delete(fileUploadController.deleteFile)

module.exports = router;