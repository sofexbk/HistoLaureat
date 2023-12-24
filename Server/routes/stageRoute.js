const express=require('express')
const router=express.Router()
const stage=require('../controllers/stageController')
const authMiddleware = require('../middlewares/auth');

router.get('/getAllStages',authMiddleware.verifyToken,stage.getAllStages)
router.get('/:laureatId/getAllStages',authMiddleware.verifyToken,stage.getStagesByLaureat)
router.post('/:laureatId/createStage',authMiddleware.verifyToken,stage.createStage)
router.patch('/:laureatId/:stageId/updateStage/',authMiddleware.verifyToken,stage.updateStage)
router.delete('/:laureatId/:stageId/deleteStage',authMiddleware.verifyToken,stage.deleteStage)

module.exports=router