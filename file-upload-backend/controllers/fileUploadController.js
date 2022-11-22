const fsPromises = require('fs').promises;
const path = require('path');
const fileUploadDB = {
    files: require('../model/files.json'),
    setFiles: function(data){ this.files = data }
}


const getAllUploadedList = async(req, res)=>{
    res.json({ files: fileUploadDB.files });
}

const uploadFile = async(req, res)=>{
    const { file } = req.body;
    if (!file || (file && !file.length) ) return res.status(400).json({ 'message': 'Please upload file.'});
    fileUploadDB.setFiles([...fileUploadDB.files, { id:fileUploadDB.files.length, file }]);
    await fsPromises.writeFile(
        path.join(__dirname,'..','model', 'files.json'),
        JSON.stringify(fileUploadDB.files)
    );
    res.status(201).json({ 'success': 'file uploaded successfully' })
}

module.exports = {
    getAllUploadedList,
    uploadFile
}