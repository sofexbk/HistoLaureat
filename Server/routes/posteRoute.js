const express = require('express');
const router = express.Router();
const posteController = require('../controllers/posteController');
const authMiddleware = require('../middlewares/auth');

router.post('/:profileId/createPoste', authMiddleware.verifyToken,posteController.createPoste);
router.patch('/:profileId/updatePoste/:postId', authMiddleware.verifyToken, posteController.updatePoste);
router.delete('/:profileId/deletePoste/:postId', authMiddleware.verifyToken, posteController.deletePoste);
router.get('/getAllPostes', authMiddleware.verifyToken, posteController.getAllPostes);
router.get('/getPostesByProfile/:profileId', authMiddleware.verifyToken, posteController.getPostesByProfile);

module.exports = router;
