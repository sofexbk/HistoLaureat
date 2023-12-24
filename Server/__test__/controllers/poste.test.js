
const Poste = require('../../models/posteModel');
const Profile = require('../../models/profileModel');
const User = require('../../models/userModel');
const { ObjectId } = require('mongoose').Types;
const { createPoste ,
        updatePoste,
        deletePoste ,
        getPostesByProfile,
        getAllPostes} = require('../../controllers/posteController');

jest.mock('../../models/posteModel');
jest.mock('../../models/profileModel');
jest.mock('../../models/userModel');

describe('Poste Controller', () => {
  describe('createPoste', () => {
    it('should create a poste successfully', async () => {
      // Mock Profile.findById to resolve with a valid object
      Profile.findById.mockResolvedValueOnce({ _id: 'profile123', userId: 'user123' });

      // Mock User.findById to resolve with a valid object
      User.findById.mockResolvedValueOnce({ _id: 'user123' });

      const validObjectId = new ObjectId();
      const date = new Date();
      const req = {
        params: {
          profileId: validObjectId.toHexString(),
        },
        body: {
          title: 'Test Post',
          content: 'This is a test post',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      try {
        await createPoste(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Poste created successfully',
          poste: expect.any(Poste),
        });
      } catch (error) {
        console.error('Error in test:', error);
        throw error; // Re-throw the error to fail the test
      }
    });
  });

 

 
  describe('updatePoste', () => {
      it('should update a poste successfully', async () => {
      const profileId = 'profile123';
      const postId = 'poste1';

      const req = {
        params: { profileId, postId },
        body: {
          title: 'Updated title',
          content: 'Updated content',
        },
        file: {/* Mocked file object if needed */},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mocking the findById method of Poste model
      const existingPoste = {
        _id: postId,
        profileId,
        title: 'test title',
        content: 'test content',
      };

      existingPoste.save = jest.fn().mockResolvedValueOnce(existingPoste); // Mocking the save method

      Poste.findById.mockResolvedValueOnce(existingPoste);

      await updatePoste(req, res);

      // Asserting that findById method has been called with the expected argument
      expect(Poste.findById).toHaveBeenCalledWith(postId);

      // Asserting that the save method has been called on the existingPoste
      expect(existingPoste.save).toHaveBeenCalled();

      // Asserting that the response is as expected
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Poste mis à jour avec succès',
        poste: expect.any(Object), // You may want to check the actual value more specifically
      });
    });
    
  
    it('should handle postId missing in request parameters', async () => {
      const req = {
        params: {
          profileId: 'profile123',
        },
        body: {
          title: 'Updated Test Post',
          content: 'Updated content',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updatePoste(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'postId is required in the request parameters.',
      });
    });
  
    it('should handle non-existing poste', async () => {
      const req = {
        params: {
          profileId: 'profile123',
          postId: 'nonExistingPostId',
        },
        body: {
          title: 'Updated Test Post',
          content: 'Updated content',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Poste.findById method to return null (non-existing poste)
      Poste.findOne.mockResolvedValueOnce(null);
  
      await updatePoste(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Poste not found.',
      });
    });
  
    it('should handle internal server error', async () => {
      const req = {
        params: {
          profileId: 'profile123',
          postId: 'post123',
        },
        body: {
          title: 'Updated Test Post',
          content: 'Updated content',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Poste.findById method to throw an error
      Poste.findById.mockRejectedValueOnce(new Error('Database error'));
  
      await updatePoste(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
        error: 'Database error',
      });
    });
  });
  
  describe('getPostesByProfile', () => {
    it('should get postes for a Profile successfully', async () => {
      const profileId = 'profile123';
      const postesMock = [
        {
          _id: 'poste1',
          title: 'Software Developer',
          content: 'Worked on web development projects',
        },
      ];

      // Configuring the mock for Poste.find
      const findMock = jest.fn();
      findMock.mockReturnValueOnce({ sort: jest.fn().mockResolvedValueOnce(postesMock) });
      Poste.find = findMock;

      // Mocking request and response objects
      const req = { params: { profileId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Calling the controller function
      await getPostesByProfile(req, res);

      // Asserting that the status method is called with the expected value
      expect(res.status).toHaveBeenCalledWith(200);

      // Asserting that the json method is called with the expected value
      expect(res.json).toHaveBeenCalledWith({ message: 'Postes récupérés avec succès', postes: postesMock });
    });
  });
    describe('getAllPostes', () => {
      it('should retrieve all postes successfully', async () => {
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const postesMock = [
          { _id: 'post1', title: 'Post 1', content: 'Content 1', creationDate: new Date() },
          { _id: 'post2', title: 'Post 2', content: 'Content 2', creationDate: new Date() },
        ];
  
        // Configuring the mock for Poste.find
        const findMock = jest.fn();
        findMock.mockReturnValueOnce({
          sort: jest.fn().mockResolvedValueOnce(postesMock),
        });
        Poste.find = findMock;
  
        // Calling the controller function
        await getAllPostes(req, res);
  
        // Asserting that the status method is called with the expected value
        expect(res.status).toHaveBeenCalledWith(200);
  
        // Asserting that the json method is called with the expected value
        expect(res.json).toHaveBeenCalledWith({
          message: 'Tous les postes récupérés avec succès',
          postes: postesMock,
        });
      });
  
      it('should handle internal server error', async () => {
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        // Simuler une erreur interne
        jest.spyOn(Poste, 'find').mockImplementationOnce(() => {
          throw new Error('Some internal error');
        });
  
        // Calling the controller function
        await getAllPostes(req, res);
  
        // Asserting that the status method is called with the expected value
        expect(res.status).toHaveBeenCalledWith(500);
  
        // Asserting that the json method is called with the expected value
        expect(res.json).toHaveBeenCalledWith({
          message: 'Internal server error',
          error: 'Some internal error',
        });
      });
    });




  describe('deletePoste', () => {
    it('should delete a poste successfully', async () => {
      const req = {
        params: {
          profileId: 'profile123',
          postId: 'post123',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteOneMock = jest.fn().mockResolvedValueOnce({ deletedCount: 1 });
      // Mocking the Poste model's deleteOne method
      jest.spyOn(Poste, 'deleteOne').mockImplementation(deleteOneMock);
  
      await deletePoste(req, res);
  
      expect(deleteOneMock).toHaveBeenCalledWith({ _id: 'post123', profileId: 'profile123' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Poste supprimé avec succès' });
    });
  
    it('should handle missing postId in request parameters', async () => {
      const req = {
        params: {
          profileId: 'profile123',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await deletePoste(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'postId is required in the request parameters.' });
    });
  
    it('should handle Poste not found or unauthorized deletion', async () => {
      const req = {
        params: {
          profileId: 'profile123',
          postId: 'nonexistentpost',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteOneMock = jest.fn().mockResolvedValueOnce({ deletedCount: 0 });
      jest.spyOn(Poste, 'deleteOne').mockImplementation(deleteOneMock);
  
      await deletePoste(req, res);
  
      expect(deleteOneMock).toHaveBeenCalledWith({ _id: 'nonexistentpost', profileId: 'profile123' });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Poste not found or you are not authorized to delete it.',
      });
    });
  
    it('should handle internal server error', async () => {
      const req = {
        params: {
          profileId: 'profile123',
          postId: 'post123',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteOneMock = jest.fn().mockRejectedValueOnce(new Error('Some internal error'));
      jest.spyOn(Poste, 'deleteOne').mockImplementation(deleteOneMock);
  
      await deletePoste(req, res);
  
      expect(deleteOneMock).toHaveBeenCalledWith({ _id: 'post123', profileId: 'profile123' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
        error: 'Some internal error',
      });
    });
  });
  

  
  
  });









