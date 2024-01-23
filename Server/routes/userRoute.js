const express=require('express')
const router=express.Router()
const {loginUser,signupUser,forgotPassword, resetPassword,renderResetPasswordForm}=require('../controllers/userController')

router.post('/login',loginUser)
router.post('/signup',signupUser)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
//router.get('/reset-password/:token', renderResetPasswordForm);

module.exports=router