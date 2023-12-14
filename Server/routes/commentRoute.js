const express = require('express');
const router = express.Router();
const posteController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/auth');

router.post('/createComment/:posteId/:profileId', authMiddleware.verifyToken,posteController.createComment);


router.patch('/updateComment/:commentId/:profileId', authMiddleware.verifyToken, posteController.updateComment);

router.delete('/deleteComment/:commentId/:profileId', authMiddleware.verifyToken, posteController.deleteComment);

router.get('/getCommentsByPoste/:posteId', authMiddleware.verifyToken, posteController.getCommentsByPoste);
router.get('/getCommentsById/:commentId/:profileId', authMiddleware.verifyToken, posteController.getCommentById);
module.exports = router;