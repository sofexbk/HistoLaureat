const Poste = require('../models/posteModel');
const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const Comment=require('../models/commentModel')
const { Types: { ObjectId } } = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

exports.createPoste= async (req, res) => {
  try {
    const { profileId } = req.params;
    const {  title, content } = req.body;
    const profileObjectId = new ObjectId(profileId);
    const profile = await Profile.findById(profileObjectId);
    if (!profile) {
      return res.status(404).json({ message: 'Le profile n\'est pas trouvé.' });
    }
    const image = req.file;
    const user = await User.findById(profile.userId);
    if (!user ) {
      return res.status(404).json({ message: 'Le profil ou l\'utilisateur n\'existe pas.' });
    }

    const creationDate= new Date();
    
    const newPoste = new Poste({
      profileId: profileObjectId,
      title,
      content,
      image,
      creationDate
    });
    await newPoste.save();
    res.status(201).json({ message: 'Poste créé avec succès', poste: newPoste });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

 
exports.updatePoste = async (req, res) => {
  try {
    const { profileId, postId } = req.params;
    const { title, content } = req.body;

    if (!postId) {
      return res.status(400).json({ message: 'L\'identifiant du poste est requis dans les paramètres de la requête.' });
    }

    const creationDate = new Date();
    const image = req.file;

    const existingPoste = await Poste.findById(postId);

    if (!existingPoste) {
      return res.status(404).json({ message: 'Poste non trouvé.' });
    }

    // Vérifier si l'utilisateur actuel est l'auteur du poste
    if (existingPoste.profileId.toString() !== profileId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à mettre à jour ce poste.' });
    }

  if (title !== undefined) {
      existingPoste.title = title;
    }
    if (content !== undefined) {
      existingPoste.content = content;
    }

    existingPoste.image = image;
    existingPoste.creationDate = creationDate;

    const updatedPoste = await existingPoste.save();

    res.status(200).json({  message: 'Poste mis à jour avec succès', poste: updatedPoste });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

exports.deletePoste = async (req, res) => {
  try {
    const { profileId, postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: 'L\'identifiant du poste est requis dans les paramètres de la requête.' });
    }
    const post = await Poste.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Poste non trouvé ou vous n\'êtes pas autorisé à le supprimer.' });
    }
    const commentIds = post.comments;
    for (const commentId of commentIds) {
      await Comment.deleteOne({ _id: commentId });
    }
    await Poste.deleteOne({ _id: postId, profileId });
    res.status(200).json({ message: 'Poste et commentaires supprimés avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

  exports.getPostesByProfile = async (req, res) => {
    try {
      const { profileId } = req.params;
  
      if (!profileId) {
        return res.status(400).json({ message: 'L\'identifiant du profil est requis dans les paramètres de la requête.' });
      }
  
      const postes = await Poste.find({ profileId }).sort({ creationDate: -1 });
  
      res.status(200).json({ message: 'Postes récupérés avec succès', postes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
  };
  exports.getAllPostes = async (req, res) => {
    try {
      // Récupérer tous les postes
      const postes = await Poste.find().sort({ creationDate: -1 }).populate('comments', 'content creationDate');
      res.status(200).json({ message: 'Tous les postes récupérés avec succès', postes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
  };