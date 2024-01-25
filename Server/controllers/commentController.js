const Comment = require('../models/commentModel');
const Poste = require('../models/posteModel');
const Profile = require('../models/profileModel');
const { Types: { ObjectId } } = require('mongoose');

// Créer un commentaire
exports.createComment = async (req, res) => {
  try {
    const { profileId, posteId } = req.params;
    const { content } = req.body;
    const poste = await Poste.findById(posteId);
    if (!poste) {
      return res.status(404).json({ message: 'Le poste n\'a pas été trouvé.' });
    }
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Le profile n\'a pas été trouvé.' });
    }
    const creationDate = new Date();
    const newComment = new Comment({
      posteId,
      profileId,
      content,
      creationDate,
    });

    await newComment.save();
    const post = await Poste.findById(posteId);
    post.comments.push(newComment._id);
    await post.save();
    res.status(201).json({ message: 'Commentaire créé avec succès', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

// Mettre à jour un commentaire
exports.updateComment = async (req, res) => {
  try {
    const { profileId, commentId } = req.params;
    const { content } = req.body;

    if (!commentId) {
      return res.status(400).json({ message: 'commentId est requis dans les paramètres de la requête.' });
    }

    const existingComment = await Comment.findById(commentId);

    if (!existingComment) {
      return res.status(404).json({ message: 'Commentaire non trouvé.' });
    }

    if (existingComment.profileId.toString() !== profileId) {
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
    const { profileId, commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({ message: 'commentId est requis dans les paramètres de la requête.' });
    }

    const result = await Comment.deleteOne({ _id: commentId, profileId });

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
    console.log('Comments retrieved for post ID:', posteId, comments);

    res.status(200).json({ message: 'Commentaires récupérés avec succès', comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};
// Récupérer un commentaire par ID
exports.getCommentById = async (req, res) => {
  try {
    const { profileId, commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({ message: 'commentId est requis dans les paramètres de la requête.' });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé.' });
    }

    if (comment.profileId.toString() !== profileId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à accéder à ce commentaire.' });
    }

    res.status(200).json({ message: 'Commentaire récupéré avec succès', comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};
