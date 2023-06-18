const express = require('express');
const router = express.Router();
const { userSignUp, userLogin, verifyToken, imageupload, getuser, removeimage } = require('../controllers/user');
const multer =require('multer');


  //uploads category img
  const multerStorageCategory = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  }) 
  const uploadSingleFile = multer({ storage: multerStorageCategory }).fields([{ name: 'image', maxCount: 1 }])


router.post('/verifyToken',verifyToken)
router.post('/signup',userSignUp)
router.post('/login',userLogin)
router.post('/imageupload/:Stoken',uploadSingleFile,imageupload)
router.get('/getuser',getuser)
router.delete('/removeimage/:Stoken',removeimage)



module.exports = router;