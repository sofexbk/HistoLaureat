const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const fs = require('fs');
const path = require('path');
const Stage = require('../models/stageModel');
const Poste = require('../models/posteModel');
const Comment = require('../models/commentModel');

const mongoose = require('mongoose');
const Profile=require('../models/profileModel')
router.use(express.urlencoded({ extended: true }));

const createToken=(_id)=> {
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'50d'})
}

const loginUser=async (req,res)=>{
  const {email,password}=req.body
    try{
     const user=await User.login(email,password)
     const token=createToken(user._id)
     res.status(200).json({email,token,role:user.role,userId: user._id})
   }catch (error) {
    res.status(400).json({error:error.message})
}}

const signupUser = async (req, res) => {
  const { email, password, role, confirmPassword } = req.body;

  try {
    const user = await User.signup(email, password, confirmPassword, role);
    let token;

    if (role === 'etudiant' || role === 'laureat') {
      token = createToken(user._id);
      await sendProfileCreationEmail(email, token);
    }

    res.status(200).json({ email, role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const sendProfileCreationEmail = async (email,token) => {
  const profileCreationLink = `http://localhost:3000/create-profile?token=${token}`;

  const mailOptions = {
    from: gmailEmail,
    to: email,
    subject: 'Profile Creation Confirmation',
    html: `
      <p>Click the button below to create your profile:</p>
      <a href="${profileCreationLink}">
        <button style="background-color: #4CAF50; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Create Profile</button>
      </a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Profile creation email sent successfully');
  } catch (error) {
    console.error('Failed to send profile creation email:', error);
    console.log('Gmail response:', error.response);
    throw error;
  }
};


async function createAdminUser() {
  try {
    const email = 'admin@admin.fr';
    const password = 'admin123';

    const adminUser = await User.createAdmin(email, password);
    console.log('Admin user created:', adminUser);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  }
}



const generateResetToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

const gmailEmail = 'histolaureat@gmail.com';
const gmailPassword = 'phpi mppb nrlx rldd';

// Create a nodemailer transporter with Gmail SMTP options
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const sendResetEmail = async (email, resetToken) => {
  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
  const templatePath = path.join(__dirname, 'resetEmail.html');
  const emailTemplate = fs.readFileSync(templatePath, 'utf-8');
  const emailContent = emailTemplate.replace('{resetToken}', resetToken);
  const mailOptions = {
    from: gmailEmail,
    to: email,
    subject: 'Password Reset Request',
    html: emailContent,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset email sent successfully');
  } catch (error) {
    console.error('Failed to send reset email:', error);
    console.log('Gmail response:', error.response);
    throw error;
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    await user.save(); // Save the user object
    await sendResetEmail(email, resetToken);
    res.status(200).json({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send reset email' });
  }
};
  
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  console.log('Token:', token);
  console.log('New Password:', newPassword);
  console.log('Confirm Password:', confirmPassword);

  try {
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'Both newPassword and confirmPassword are required' });
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to reset password' });
  }
};
const getStats = async (req, res) => {
  try {
    const usersCount = await Profile.countDocuments();
    const stagesCount = await Stage.countDocuments();
    const postesCount = await Poste.countDocuments();
    const commentsCount = await Comment.countDocuments();

    res.status(200).json({
      usersCount,
      stagesCount,
      postesCount,
      commentsCount
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getUserEmail = async (req, res) => {
  try {
    const { profileId } = req.params;
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    const userId = profile.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ email: user.email });
  } catch (error) {
    console.error('Error fetching user email by profileId:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports={
    signupUser,loginUser,resetPassword,forgotPassword,createAdminUser,getUserById,getUserEmail,getStats
}
