const User = require('../models/userModel');

const getUserFromDatabase = async (email, password) => {
  try {
    const user = await User.findOne({ email, password }).exec();
    console.log('User found in the database:', user);
    return user;
  } catch (error) {
    console.error('Error fetching user from the database:', error);
    throw error;
  }
};

module.exports = getUserFromDatabase;
