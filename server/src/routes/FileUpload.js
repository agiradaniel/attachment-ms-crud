const express = require('express');
const multer = require('multer');
const { File } = require("../../models");
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage});

router.post("/upload", upload.single('file'), async(req, res)=> {

    const {filename, path} = req.file;

    const newFile = await File.create({filename, filepath: path})

})

module.exports = router


