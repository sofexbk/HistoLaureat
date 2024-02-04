const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const posteController = require('../controllers/posteController');
const profileController = require('../controllers/profileController');
const stage = require('../controllers/stageController');
const authMiddleware = require('../middlewares/auth');

router.post('/login', userController.loginUser);
router.get('/getAllPostes', authMiddleware.verifyToken, (req, res) => {
    console.log('Calling getAllPostes');
    posteController.getAllPostes(req, res);
});
router.get('/getCommentsByPoste/:posteId', authMiddleware.verifyToken, (req, res) => {
    console.log('Calling getCommentsByPoste');
    posteController.getCommentsByPoste(req, res);
});
router.get('/getAllStages', authMiddleware.verifyToken, stage.getAllStages);
router.get('/getAllProfiles', authMiddleware.verifyToken, profileController.getAllProfiles);
router.delete('/deleteProfile/:profileId', authMiddleware.verifyToken, profileController.deleteProfile);
router.delete('/:profileId/deletePoste/:postId', authMiddleware.verifyToken, posteController.deletePoste);
router.get('/pr/:id', authMiddleware.verifyToken, profileController.getProfileById);
router.delete('/:laureatId/:stageId/deleteStage',authMiddleware.verifyToken,stage.deleteStage)
router.get('/stats', authMiddleware.verifyToken, userController.getStats);
router.get('/getAllLaureats', authMiddleware.verifyToken, userController.getLaureats);



module.exports = router;
