const express = require('express');
const { adminLogin, getUsers, deleteUser, getUser, updateUser, searchUser, verifyToken, imageupload } = require('../controllers/admin');
const router = express.Router();

router.post('/verifyToken',verifyToken)
router.post('/adminLogin',adminLogin)
router.get('/getAllUsers',getUsers)
router.get('/getUser/:id',getUser)
router.delete('/deleteUser/:id',deleteUser)
router.put('/updateUser/:id',updateUser)
router.get('/searchUser/:key',searchUser)



module.exports = router;