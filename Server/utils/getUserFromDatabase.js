const User = require('../models/userModel');

const getUserFromDatabase = async (email, password) => {
  try {
    const user = await User.findOne({ email, password }).exec();
    console.log('Utilisateur pas trouvé dans la base de donné:', user);
    return user;
  } catch (error) {
    console.error('Error fetching user from the database:', error);
    throw error;
  }
};

module.exports = getUserFromDatabase;
