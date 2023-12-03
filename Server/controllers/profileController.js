const Profile = require('../models/profileModel');

const isEtuEmail = (email) => {
  const etuEmailRegex = /@etu\.uae\.ac\.ma$/;
  return etuEmailRegex.test(email);
};

const validateFields = ({ firstName, lastName, filiere, niveau, role, experiences, posteActuel, experiencesPassee, email }) => {
  if (!firstName || !lastName || !filiere || !role) {
    throw new Error('Tous les champs obligatoires doivent être remplis.');
  }

  if (role === 'etudiant') {
    if (!email) {
      throw new Error('L\'adresse e-mail est obligatoire pour les étudiants.');
    }
    if (!isEtuEmail(email)) {
      throw new Error('L\'adresse e-mail doit se terminer par "@etu.uae.ac.ma" pour les étudiants.');
    }
    if (!niveau) {
      throw new Error('Le niveau est obligatoire pour les étudiants.');
    }
  }
};

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required in the request.' });
    }

    const { firstName, lastName, filiere, niveau, role, experiences, posteActuel, experiencesPassee, email } = req.body;
    validateFields({ firstName, lastName, filiere, niveau, role, experiences, posteActuel, experiencesPassee, email });

    const existingProfile = await Profile.findOne({ userId });

    if (existingProfile) {
      existingProfile.firstName = firstName;
      existingProfile.lastName = lastName;
      existingProfile.filiere = filiere;
      existingProfile.role = role;

      if (role === 'etudiant') {
        existingProfile.experiences = experiences;
        existingProfile.posteActuel = undefined;
        existingProfile.experiencesPassee = undefined;
        existingProfile.niveau = niveau;  // Set niveau for etudiant
      } else if (role === 'laureat') {
        existingProfile.posteActuel = posteActuel;
        existingProfile.experiencesPassee = experiencesPassee;
        existingProfile.experiences = undefined;
        existingProfile.niveau = undefined;  // Clear niveau for laureat
      }

      await existingProfile.save();
      res.status(200).json({ message: 'Profile modifié avec succès', profile: existingProfile });
    } else {
      const newProfile = new Profile({ userId, firstName, lastName, filiere, role });

      if (role === 'etudiant') {
        newProfile.experiences = experiences;
        newProfile.niveau = niveau;  // Set niveau for etudiant
      } else if (role === 'laureat') {
        newProfile.posteActuel = posteActuel;
        newProfile.experiencesPassee = experiencesPassee;
      }

      await newProfile.save();
      res.status(201).json({ message: 'Profile créé avec succès', profile: newProfile });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};