const express=require('express')
const router=express.Router()
const {loginUser,signupUser,forgotPassword, resetPassword,getUserById,getUserEmail}=require('../controllers/userController')

router.post('/login',loginUser)
router.post('/signup',signupUser)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/getuserbyemail/:userId',getUserById)
router.get('/getemail/:profileId',getUserEmail)
module.exports=router