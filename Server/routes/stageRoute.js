/*const express=require('express')
const router=express.Router()
const {createStage,updateStage,getStage,deleteStage}=require('../controllers/stageController')
const authMiddleware = require('../middlewares/auth');

router.get('/getStage',authMiddleware.verifyToken,getStage)
router.post('/createStage',authMiddleware.verifyToken,createStage)
router.patch('/updateStage/:stageId',authMiddleware.verifyToken,updateStage)
router.delete('/deleteStage/:stageId',authMiddleware.verifyToken,deleteStage)
module.exports=router*/