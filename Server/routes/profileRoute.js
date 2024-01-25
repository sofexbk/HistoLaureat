const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/auth');
const multer =require('multer');
const fs=require('fs');
const { v4: uuidv4 } = require('uuid');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');   
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+uuidv4()+"_"+file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/createProfile', authMiddleware.verifyToken, upload.single('image'), profileController.createProfile);
router.patch('/updateProfile', authMiddleware.verifyToken, upload.single('image'), profileController.updateProfile);
router.get('/:userId/profile', authMiddleware.verifyToken, profileController.checkProfile);
router.get('/pr/:id',authMiddleware.verifyToken,profileController.getProfileById)
router.get('/:userId', authMiddleware.verifyToken, profileController.getProfile);

module.exports = router;