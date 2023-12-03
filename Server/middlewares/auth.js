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
  
exports.requireRole = (allowedRoles) => {
    return (req, res, next) => {
      const { role } = req.userProfile;
      if (allowedRoles === role) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
      }
    };
  };

  const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing.' });
      }
      const userId = await getUserIdFromToken(token); 
      console.log('Decoded Token:', jwt.verify(token, process.env.SECRET));
      console.log('userId:', userId);
  
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
  
  const authMiddleware = async (req, res, next) => {
    try {
      const user = await getUserFromDatabase(req.body.email, req.body.password);
      if (!user) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
      }
      if (user.role === 'etudiant') {
        const isEtuEmail = /@etu\.uae\.ac\.ma$/;
        if (!isEtuEmail.test(user.email)) {
          return res.status(403).json({ message: 'L\'adresse e-mail doit se terminer par "@etu.uae.ac.ma"' });
        }
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
  