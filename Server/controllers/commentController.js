const Comment = require('../models/commentModel');
const Poste = require('../models/posteModel');
const User = require('../models/userModel');
const { Types: { ObjectId } } = require('mongoose');

// Créer un commentaire
exports.createComment = async (req, res) => {
  try {
    const { userId, posteId } = req.params;
    const { content } = req.body;

    const poste = await Poste.findById(posteId);
    if (!poste) {
      return res.status(404).json({ message: 'Le poste n\'a pas été trouvé.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'L\'utilisateur n\'a pas été trouvé.' });
    }

    const creationDate = new Date();
    const newComment = new Comment({ posteId, userId, content, creationDate });

    await newComment.save();

    res.status(201).json({ message: 'Commentaire créé avec succès', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

// Mettre à jour un commentaire
exports.updateComment = async (req, res) => {
  try {
    const { userId, commentId } = req.params;
    const { content } = req.body;

    if (!commentId) {
      return res.status(400).json({ message: 'commentId est requis dans les paramètres de la requête.' });
    }

    const existingComment = await Comment.findById(commentId);

    if (!existingComment) {
      return res.status(404).json({ message: 'Commentaire non trouvé.' });
    }

    if (existingComment.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à mettre à jour ce commentaire.' });
    }

    existingComment.creationDate = new Date();
    existingComment.content = content;

    await existingComment.save();

    res.status(200).json({ message: 'Commentaire mis à jour avec succès', comment: existingComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
  try {
    const { userId, commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({ message: 'commentId est requis dans les paramètres de la requête.' });
    }

    const result = await Comment.deleteOne({ _id: commentId, userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Commentaire non trouvé ou vous n\'êtes pas autorisé à le supprimer.' });
    }

    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

// Récupérer les commentaires pour un poste donné
exports.getCommentsByPoste = async (req, res) => {
  try {
    const { posteId } = req.params;

    if (!posteId) {
      return res.status(400).json({ message: 'posteId est requis dans les paramètres de la requête.' });
    }

    const comments = await Comment.find({ posteId }).sort({ creationDate: -1 });

    res.status(200).json({ message: 'Commentaires récupérés avec succès', comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};
