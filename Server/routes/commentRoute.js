const express = require('express');
const router = express.Router();
const posteController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/auth');

router.post('/createComment/:posteId/:userId', authMiddleware.verifyToken,posteController.createComment);


router.patch('/updateComment/:commentId/:userId', authMiddleware.verifyToken, posteController.updateComment);

router.delete('/deleteComment/:commentId/:userId', authMiddleware.verifyToken, posteController.deleteComment);

router.get('/getCommentsByPoste/:posteId', authMiddleware.verifyToken, posteController.getCommentsByPoste);

module.exports = router;