const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/auth');
router.post('/createOrUpdate', authMiddleware.verifyToken, profileController.createOrUpdateProfile);

module.exports = router;