const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer()
const tf = require('@tensorflow/tfjs-node');
var Jimp = require('jimp');

const {
    register,
    login
} = require("../controllers/auth");

// Authentication
router.post("/login", login);
router.post("/register", register);
router.post("/req-tester", upload.single('image'), (req, res) => {
    Jimp.read(req.file.buffer)
        .then(image => {
            result = tf.tensor(image.bitmap.data).reshape([image.bitmap.height, image.bitmap.width, -1]);
            // tf.print(result)
            console.log(result.)
        })
        .catch(err => {
            res.send(err)
        });
})

module.exports = router;