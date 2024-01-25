const jwt = require('jsonwebtoken');
const getUserFromDatabase = require('../utils/getUserFromDatabase');

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return decodedToken._id;
  } catch (error) {
    console.error('Erreur lors du décodage du jeton :', error.message);
    return null;
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Le jeton d\'autorisation est manquant.' });
    }
    const userId = await getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({ message: 'Jeton invalide ou expiré.' });
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du jeton :', error.message);
    res.status(401).json({ message: 'Non autorisé' });
  }
};

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
const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access forbidden. Admin privileges required.' });
  }
};

module.exports = {
  verifyToken,
  authMiddleware,
  isAdmin,
};