const { createStage, getAllStages, getStagesByLaureat, updateStage, deleteStage } = require('../../controllers/stageController');
const Stage = require('../../models/stageModel');
const Profile = require('../../models/profileModel');
const User = require('../../models/userModel');
const { ObjectId } = require('mongoose').Types;

jest.mock('../../models/stageModel');
jest.mock('../../models/profileModel');
jest.mock('../../models/userModel');

describe('Stage Controller', () => {
  describe('createStage', () => {
    it('should create a stage successfully', async () => {
      Profile.findById.mockResolvedValueOnce({ userId: 'user123'});
      User.findById.mockResolvedValueOnce({ role: 'laureat' });
      const validObjectId = new ObjectId();
      const req = {
        params: {
          laureatId: validObjectId.toHexString(), 
        },
        body: {
          company: 'ABC Inc',
          type: 'Internship',
          title: 'Software Developer',
          description: 'Worked on web development projects',
          startDate: '2023-01-01',
          endDate: '2023-03-31',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createStage(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Stage created successfully',
        stage: expect.any(Stage),
      });
    });
  });



  describe('getAllStages', () => {
    it('should get all stages successfully', async () => {
      const stagesMock = [
        {
          _id: 'stage1',
          company: 'ABC Inc',
          type: 'Internship',
          title: 'Software Developer',
          description: 'Worked on web development projects',
          startDate: '2023-01-01',
          endDate: '2023-03-31',
        },
      ];

      Stage.find.mockResolvedValueOnce(stagesMock);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllStages(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ stages: stagesMock });
    });
  });

  describe('getStagesByLaureat', () => {
    it('should get stages for a laureat successfully', async () => {
      const laureatId = 'laureat123';
      const stagesMock = [
        {
          _id: 'stage1',
          company: 'ABC Inc',
          type: 'Internship',
          title: 'Software Developer',
          description: 'Worked on web development projects',
          startDate: '2023-01-01',
          endDate: '2023-03-31',
        },
      ];

      Stage.find.mockResolvedValueOnce(stagesMock);

      const req = {
        params: { laureatId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getStagesByLaureat(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ stages: stagesMock });
    });

    it('should return 404 if no stages found for the given laureat', async () => {
      const laureatId = 'laureat123';

      Stage.find.mockResolvedValueOnce([]);

      const req = {
        params: { laureatId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getStagesByLaureat(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No stages found for the given laureat.' });
    });
  });

  describe('updateStage', () => {
    it('should update a stage successfully', async () => {
      const laureatId = 'laureat123';
      const stageId = 'stage1';

      const req = {
        params: { laureatId, stageId },
        body: {
          company: 'Updated ABC Inc',
          type: 'Updated Internship',
          title: 'Updated Software Developer',
          description: 'Updated Worked on web development projects',
          startDate: '2023-02-01',
          endDate: '2023-04-30',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const existingStage = {
        _id: stageId,
        laureatId,
        company: 'ABC Inc',
        type: 'Internship',
        title: 'Software Developer',
        description: 'Worked on web development projects',
        startDate: '2023-01-01',
        endDate: '2023-03-31',
        save: jest.fn(),
      };

      Stage.findOne.mockResolvedValueOnce(existingStage);

      await updateStage(req, res);

      expect(existingStage.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Stage updated successfully',
        stage: existingStage,
      });
    });

    it('should return 404 if stage not found for the specified laureat', async () => {
      const laureatId = 'laureat123';
      const stageId = 'stage1';

      const req = {
        params: { laureatId, stageId },
        body: {
          company: 'Updated ABC Inc',
          type: 'Updated Internship',
          title: 'Updated Software Developer',
          description: 'Updated Worked on web development projects',
          startDate: '2023-02-01',
          endDate: '2023-04-30',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Stage.findOne.mockResolvedValueOnce(null);
      await updateStage(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Stage not found for the specified laureat.' });
    });
  });
  describe('deleteStage', () => {
    it('should delete a stage successfully', async () => {
      const laureatId = 'laureat123';
      const stageId = 'stage1';
      const req = {
        params: { laureatId, stageId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const deletedStage = {
        _id: stageId,
        laureatId,
        company: 'ABC Inc',
        type: 'Internship',
        title: 'Software Developer',
        description: 'Worked on web development projects',
        startDate: '2023-01-01',
        endDate: '2023-03-31',
      };

      Stage.findOneAndDelete.mockResolvedValueOnce(deletedStage);
      await deleteStage(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Stage deleted successfully',
        stage: deletedStage,
      });
    });

    it('should return 404 if stage not found for the specified laureat', async () => {
      const laureatId = 'laureat123';
      const stageId = 'stage1';
      const req = {
        params: { laureatId, stageId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Stage.findOneAndDelete.mockResolvedValueOnce(null);
      await deleteStage(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Stage not found for the specified laureat.' });
    });
  });
});
