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
      return res.status(404).json({ message: 'Laureat profile not found.' });
    }
    const user = await User.findById(profile.userId);
    if (!user || user.role !== 'laureat') {
      return res.status(404).json({ message: 'Laureat profile not found or user is not a laureat.' });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      return res.status(400).json({ message: 'Invalid date range. Start date must be earlier than end date.' });
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
    res.status(201).json({ message: 'Stage created successfully', stage: newStage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
exports.getAllStages = async (req, res) => {
    try {
      const stages = await Stage.find({}, { laureatId: 0 });
      res.status(200).json({ stages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  exports.getStagesByLaureat = async (req, res) => {
    try {
      const { laureatId } = req.params;
      const stages = await Stage.find({ laureatId })
      if (!stages || stages.length === 0) {
        return res.status(404).json({ message: 'No stages found for the given laureat.' });
      }
      res.status(200).json({ stages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  exports.updateStage = async (req, res) => {
    try {
      const { laureatId, stageId } = req.params;
      const { company, type, title, description, startDate, endDate } = req.body;
      const existingStage = await Stage.findOne({ _id: stageId, laureatId });
      if (!existingStage) {
        return res.status(404).json({ message: 'Stage not found for the specified laureat.' });
      }
      existingStage.company = company;
      existingStage.type = type;
      existingStage.title = title;
      existingStage.description = description;
      existingStage.startDate = startDate;
      existingStage.endDate = endDate;
      await existingStage.save();
      res.status(200).json({ message: 'Stage updated successfully', stage: existingStage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  exports.deleteStage = async (req, res) => {
    try {
      const { laureatId, stageId } = req.params;
      const deletedStage = await Stage.findOneAndDelete({ _id: stageId, laureatId });
      if (!deletedStage) {
        return res.status(404).json({ message: 'Stage not found for the specified laureat.' });
      }
      res.status(200).json({ message: 'Stage deleted successfully', stage: deletedStage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };