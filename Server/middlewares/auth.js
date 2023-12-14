const jwt = require('jsonwebtoken');
const getUserFromDatabase = require('../utils/getUserFromDatabase');

const getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      return decodedToken._id;
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return null;
    }
  };
  
  const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing.' });
      }
      const userId = await getUserIdFromToken(token); 
      //console.log('Decoded Token:', jwt.verify(token, process.env.SECRET));
      //console.log('userId:', userId);
  
      if (!userId) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
      }
      req.userId = userId;
      next();
    } catch (error) {
      console.error('Error verifying token:', error.message);
      res.status(401).json({ message: 'Unauthorized' });
    }
  };

  /*
  const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing.' });
        }
        const { userId, profileId } = jwt.verify(token, process.env.SECRET);

        // Vérifiez que le Profil ID dans le token correspond au Profil ID associé à l'utilisateur
        const userProfile = await Profile.findOne({ userId, _id: profileId });
        if (!userProfile) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        req.userId = userId;
        req.profileId = profileId;
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        res.status(401).json({ message: 'Unauthorized' });
    }
}; */
  
  const authMiddleware = async (req, res, next) => {
    try {
      const user = await getUserFromDatabase(req.body.email, req.body.password);
      if (!user) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
      }
      req.userProfile = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };
  
  module.exports = {
    verifyToken,authMiddleware
  };
  