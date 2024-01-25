const mongoose = require('mongoose');
const { Types } = mongoose;
const { ObjectId } = Types;

const Stage = require('../models/stageModel');
const Profile = require('../models/profileModel');
const User = require('../models/userModel'); 

exports.createStage = async (req, res) => {
  try {
    const { laureatId } = req.params;
    const { company, type, title, description, startDate, endDate } = req.body;
    const laureatObjectId = new ObjectId(laureatId);
    const profile = await Profile.findById(laureatObjectId);
    if (!profile) {
      return res.status(404).json({ message: 'Profil de lauréat non trouvé.' });
    }
    const user = await User.findById(profile.userId);
    if (!user || user.role !== 'laureat') {
      return res.status(404).json({ message: 'Profil de lauréat non trouvé ou l\'utilisateur n\'est pas un lauréat.' });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const currentDate = new Date();
        if (start.getTime() <= currentDate.getTime() || end.getTime() <= currentDate.getTime()) {
      return res.status(400).json({ message: 'Les dates de début et de fin doivent être dans le futur.' });
    }
    if (start >= end) {
      return res.status(400).json({ message: 'Plage de dates invalide. La date de début doit être antérieure à la date de fin.' });
    }
    const newStage = new Stage({
      laureatId: laureatObjectId,
      company,
      type,
      title,
      description,
      startDate,
      endDate
    });
    await newStage.save();
    res.status(201).json({ message: 'Stage créé avec succès', stage: newStage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};
exports.getAllStages = async (req, res) => {
    try {
      const stages = await Stage.find({}, { laureatId: 0 });
      res.status(200).json({ stages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
  };
  exports.getStagesByLaureat = async (req, res) => {
    try {
      const { laureatId } = req.params;
      const stages = await Stage.find({ laureatId })
      if (!stages || stages.length === 0) {
        return res.status(404).json({ message:  'Aucun stage trouvé pour le lauréat spécifié.'  });
      }
      res.status(200).json({ stages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
  };
  exports.updateStage = async (req, res) => {
    try {
      const { laureatId, stageId } = req.params;
      const { company, type, title, description, startDate, endDate } = req.body;
      const existingStage = await Stage.findOne({ _id: stageId, laureatId });
      if (!existingStage) {
        return res.status(404).json({ message: 'Stage non trouvé pour le lauréat spécifié.' });
      }
      existingStage.company = company;
      existingStage.type = type;
      existingStage.title = title;
      existingStage.description = description;
      existingStage.startDate = startDate;
      existingStage.endDate = endDate;
      await existingStage.save();
      res.status(200).json({ message:'Stage mis à jour avec succès', stage: existingStage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message:'Erreur interne du serveur', error: error.message });
    }
  };
  exports.deleteStage = async (req, res) => {
    try {
      const { laureatId, stageId } = req.params;
      const deletedStage = await Stage.findOneAndDelete({ _id: stageId, laureatId });
      if (!deletedStage) {
        return res.status(404).json({ message: 'Stage non trouvé pour le lauréat spécifié.'});
      }
      res.status(200).json({ message:'Stage supprimé avec succès', stage: deletedStage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
  };