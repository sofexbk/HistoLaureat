const Profile = require('../../models/profileModel');
const {
  createProfile,
  updateProfile,
  checkProfile,
} = require('../../controllers/profileController');

jest.mock('../../models/profileModel');

describe('Profile Controller', () => {
  describe('createProfile', () => {
    it('should create a profile successfully', async () => {
      const req = {
        userId: 'user123',
        role: 'etudiant',
        body: {
          firstName: 'John',
          lastName: 'Doe',
          filiere: 'Computer Science',
          niveau: 'Bachelor',
          experiences: 'Internship at ABC Corp',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Profile créé avec succès',
        profile: expect.any(Profile),
      });
    });
  });

  describe('updateProfile', () => {
    it('should update a profile successfully', async () => {
      const req = {
        userId: 'user123',
        role: 'etudiant',
        body: {
          firstName: 'Updated John',
          lastName: 'Updated Doe',
          filiere: 'Updated Computer Science',
          niveau: 'Master',
          experiences: 'Updated Internship at ABC Corp',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
        const existingProfile = {
        userId: 'user123',
        role: 'etudiant',
        firstName: 'John',
        lastName: 'Doe',
        filiere: 'Computer Science',
        niveau: 'Bachelor',
        experiences: 'Internship at ABC Corp',
        save: jest.fn(), 
      };
      Profile.findOne.mockResolvedValueOnce(existingProfile);
      await updateProfile(req, res);
        expect(existingProfile.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Profile modifié avec succès',
        profile: existingProfile,
      });
    });
  });

  describe('checkProfile', () => {
    it('should return true if profile exists', async () => {
      const req = {
        params: {
          userId: 'user123',
        },
      };
      const res = {
        json: jest.fn(),
      };
      Profile.findOne.mockResolvedValueOnce({
        userId: 'user123',
        role: 'etudiant',
      });
      await checkProfile(req, res);
      expect(res.json).toHaveBeenCalledWith({
        hasProfile: true,
      });
    });

    it('should return false if profile does not exist', async () => {
      const req = {
        params: {
          userId: 'user123',
        },
      };
      const res = {
        json: jest.fn(),
      };
      Profile.findOne.mockResolvedValueOnce(null);
      await checkProfile(req, res);
      expect(res.json).toHaveBeenCalledWith({
        hasProfile: false,
      });
    });
  });
});
