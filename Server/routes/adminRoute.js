const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const posteController = require('../controllers/posteController');
const profileController = require('../controllers/profileController');
const stage = require('../controllers/stageController');
const authMiddleware = require('../middlewares/auth');

router.post('/login', userController.loginUser);
router.get('/getAllPostes', authMiddleware.verifyToken, authMiddleware.isAdmin, (req, res) => {
    console.log('Calling getAllPostes');
    posteController.getAllPostes(req, res);
});
router.get('/getCommentsByPoste/:posteId', authMiddleware.verifyToken, authMiddleware.isAdmin, (req, res) => {
    console.log('Calling getCommentsByPoste');
    posteController.getCommentsByPoste(req, res);
});
router.get('/getAllStages', authMiddleware.verifyToken, authMiddleware.isAdmin, stage.getAllStages);
router.get('/getAllProfiles', authMiddleware.verifyToken, authMiddleware.isAdmin, profileController.getAllProfiles);
router.delete('/deleteProfile/:profileId', authMiddleware.verifyToken, authMiddleware.isAdmin, profileController.deleteProfile);
router.delete('/:profileId/deletePoste/:postId', authMiddleware.verifyToken, authMiddleware.isAdmin, posteController.deletePoste);
router.get('/pr/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, profileController.getProfileById);
router.delete('/:laureatId/:stageId/deleteStage',authMiddleware.verifyToken,authMiddleware.isAdmin,stage.deleteStage);

module.exports = router;
