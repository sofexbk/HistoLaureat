const express = require('express');
const router = express.Router();
const posteController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/auth');
const commentController=require('../controllers/commentController')

router.post('/createComment/:posteId/:profileId', authMiddleware.verifyToken,posteController.createComment);
//router.patch('/updateComment/:commentId/:profileId', authMiddleware.verifyToken, posteController.updateComment);
//router.delete('/deleteComment/:commentId/:profileId', authMiddleware.verifyToken, posteController.deleteComment);
router.get('/getCommentsByPoste/:posteId', authMiddleware.verifyToken, posteController.getCommentsByPoste);
router.get('/getCommentsById/:commentId/:profileId', authMiddleware.verifyToken, posteController.getCommentById);
router.delete('/deleteCommentByPost/:postID/:commentID/:profileID', authMiddleware.verifyToken, commentController.deleteCommentByPost);
router.patch('/updateComment/:postID/:commentID/:profileID', authMiddleware.verifyToken, commentController.updateCommentByPost);

module.exports = router;