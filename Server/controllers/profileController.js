const Profile = require('../models/profileModel');
const fs=require('fs');
const validateFields = ({ firstName, lastName, filiere, experiences, posteActuel, experiencesPassee, niveau,role,promotion }) => {
  if (!firstName || !lastName || !filiere) {
    throw new Error('Tous les champs obligatoires doivent être remplis.');
  }
if(role=='etudiant')
  if (!niveau) {
    throw new Error('Le niveau est obligatoire pour les étudiants.');
  }
};

exports.createProfile = async (req, res) => {
  try {
    const { userId, role } = req;
    console.log(req.file);
    if (!userId) {
      return res.status(400).json({ message: 'userId et image sont requis dans la requête.' });
    }
    const image = req.file ? req.file.filename : null;    
    const { firstName, lastName, filiere, niveau, experiences, posteActuel, experiencesPassee,promotion} = req.body;
    validateFields({ firstName, lastName, filiere, niveau, experiences, posteActuel, experiencesPassee,role,promotion});
    const newProfile = new Profile({ userId, firstName, lastName, filiere, niveau, experiences, posteActuel, experiencesPassee,role,promotion,image});
    if (role === 'etudiant') {
      newProfile.experiences = experiences;
      newProfile.niveau = niveau; 
      newProfile.posteActuel=undefined
      newProfile.experiencesPassee=undefined
    } else if (role === 'laureat') {
      newProfile.posteActuel = posteActuel;
      newProfile.experiencesPassee = experiencesPassee;
      newProfile.promotion=promotion;
      newProfile.experiences = undefined
      newProfile.niveau = undefined 
    }
    await newProfile.save();
    res.status(201).json({ message: 'Profile créé avec succès', profile: newProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { userId, role } = req;
    if (!userId) {
      return res.status(400).json({ message: 'userId et image sont requis dans la requête.' });
    }

    let new_image = '';
    if (req.file) {
      new_image = req.file ? req.file.filename : '';
      if (req.body.old_image) {
        try {
          fs.unlinkSync('./uploads/' + req.body.old_image);
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error deleting old image', error: err.message });
        }
      }
    } else {
      new_image = req.body.old_image;
    }

    const { firstName, lastName, filiere, niveau, experiences, posteActuel, experiencesPassee } = req.body;
    validateFields({ firstName, lastName, filiere, niveau, experiences, posteActuel, experiencesPassee });

    const existingProfile = await Profile.findOne({ userId });

    if (!existingProfile) {
      return res.status(404).json({ message: 'Profil non trouvé pour l\'userId donné.' });
    }

    existingProfile.firstName = firstName;
    existingProfile.lastName = lastName;
    existingProfile.filiere = filiere;
    existingProfile.image = new_image;

    if (role === 'etudiant') {
      existingProfile.experiences = experiences;
      existingProfile.posteActuel = undefined;
      existingProfile.experiencesPassee = undefined;
      existingProfile.niveau = niveau;  
    } else if (role === 'laureat') {
      existingProfile.posteActuel = posteActuel;
      existingProfile.experiencesPassee = experiencesPassee;
      existingProfile.promotion = promotion; 
      existingProfile.experiences = undefined;
      existingProfile.niveau = undefined; 
    }

    await existingProfile.save();
    res.status(200).json({ message: 'Profile modifié avec succès', profile: existingProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};


exports.checkProfile = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const profile = await Profile.findOne({ userId });
    if (profile) {
      res.json({ hasProfile: true });
    } else {
      res.json({ hasProfile: false });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du profil :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};
const mongoose = require('mongoose');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await Profile.findOne({ userId });

    if (profile) {
      const user = await mongoose.model('User').findById(profile.userId);
      if (user) {
        const { email, ...userData } = user.toObject();
        res.json({ profile: { ...profile.toObject(), userEmail: email, user: userData } });
      } else {
        res.json({ message: "Erreur lors de la récupération de l'utilisateur associé au profil" });
      }
    } else {
      res.json({ message: "Erreur lors de la récupération du profil" });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du profil :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getAllProfiles = async (req, res) => {
  try {
    console.log("pourquoi");
    const profiles = await Profile.find({});
    res.status(200).json({ message: 'Tous les profils récupérés avec succès', profiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};
const User = require('../models/userModel'); 
const Poste = require('../models/posteModel');
const Comment = require('../models/commentModel');
const Stage = require('../models/stageModel');

exports.deleteProfile = async (req, res) => {
    const profileId = req.params.profileId;

    try {
        // Trouver le profil à supprimer
        const profileToDelete = await Profile.findById(profileId);

       if (!profileToDelete) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        // Supprimer les postes liés au profil
        await Poste.deleteMany({ profileId: profileToDelete._id });
        
        // Supprimer les commentaires liés au profil
      await Comment.deleteMany({ profileId: profileToDelete._id });
      
        // Supprimer les stages liés au profil

        await Stage.deleteMany({ laureatId: profileToDelete._id });
        
        //Supprimer le profil
        await Profile.deleteOne({ _id: profileToDelete._id });

        // Supprimer l'utilisateur associé
        await User.findByIdAndDelete(profileToDelete.userId);

      
        res.status(200).json({ message: 'Profil, utilisateur associé, postes, commentaires et stages liés supprimés avec succès'});
    } catch (error) {
        console.error('Erreur lors de la suppression du profil et de l\'utilisateur associé:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};