const Profile = require('../models/profileModel');

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
    if (!userId) {
      return res.status(400).json({ message: 'userId is required in the request.' });
    }
    const { firstName, lastName, filiere, niveau, experiences, posteActuel, experiencesPassee,promotion } = req.body;
    validateFields({ firstName, lastName, filiere, niveau, experiences, posteActuel, experiencesPassee,role,promotion });
    const newProfile = new Profile({ userId, firstName, lastName, filiere, niveau, experiences, posteActuel, experiencesPassee,role,promotion });

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
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { userId, role } = req;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required in the request.' });
    }
    const { firstName, lastName, filiere, niveau, experiences, posteActuel, experiencesPassee } = req.body;
    validateFields({ firstName, lastName, filiere, niveau, experiences, posteActuel, experiencesPassee });
    const existingProfile = await Profile.findOne({ userId });

    if (!existingProfile) {
      return res.status(404).json({ message: 'Profile not found for the given userId.' });
    }

    existingProfile.firstName = firstName;
    existingProfile.lastName = lastName;
    existingProfile.filiere = filiere;

    if (role === 'etudiant') {
      existingProfile.experiences = experiences;
      existingProfile.posteActuel = undefined;
      existingProfile.experiencesPassee = undefined;
      existingProfile.niveau = niveau;  
    } else if (role === 'laureat') {
      existingProfile.posteActuel = posteActuel;
      existingProfile.experiencesPassee = experiencesPassee;
      newProfile.promotion=promotion;
      existingProfile.experiences = undefined;
      existingProfile.niveau = undefined; 
    }

    await existingProfile.save();
    res.status(200).json({ message: 'Profile modifié avec succès', profile: existingProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
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
    console.error('Error checking profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
