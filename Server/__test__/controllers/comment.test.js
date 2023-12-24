const Comment = require('../../models/CommentModel');
const Poste = require('../../models/posteModel');
const Profile = require('../../models/profileModel');
const User = require('../../models/userModel');

const { Types: { ObjectId } } = require('mongoose');
const {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByPoste,
    getCommentById,
}=require('../../controllers/commentController');
jest.mock('../../models/commentModel');
jest.mock('../../models/posteModel');
jest.mock('../../models/profileModel');
jest.mock('../../models/userModel');
describe('Comment Controller', () => {


  describe('createComment', () => {
    it('should create a comment successfully', async () => {
      Profile.findById.mockResolvedValueOnce({ _id: 'profile123', userId: 'user123' });
      Poste.findById.mockResolvedValueOnce({ _id: 'poste123', profileId: 'profile12' });

      // Configurer le mock pour la méthode save de Comment
      const saveMock = jest.fn();
      Comment.prototype.save = saveMock;

      const validObjectId = new ObjectId();
      const validpostId = new ObjectId();

      const req = {
        params: {
          profileId: validObjectId.toHexString(),
          posteId: validpostId.toHexString(),
        },
        body: {
          content: 'This is a test comment',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      try {
        await createComment(req, res);

        // Assert that the status method is called with the expected value
        expect(res.status).toHaveBeenCalledWith(201);

        // Assert that the json method is called with the expected value
        expect(res.json).toHaveBeenCalledWith({
          message: 'Commentaire créé avec succès',
          comment: expect.any(Comment),
        });

        // Assert that the save method is called
        expect(saveMock).toHaveBeenCalled();
      } catch (error) {
        console.error('Error in test:', error);
        throw error; // Re-throw the error to fail the test
      }
    });
  });
      
  describe('updateComment', () => {
    it('should update a comment successfully', async () => {
      const commentId = 'comment123';
      const profileId = 'user123';
      const req = {
        params: {
          commentId,
          profileId,
        },
        body: {
          content: 'updated comment',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking Comment.findById to return an existing comment
      jest.spyOn(Comment, 'findById').mockResolvedValue({
        _id: commentId,
        profileId,
        content: 'original comment',
        creationDate: new Date(),
        save: jest.fn(),
      });
  
      await updateComment(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Commentaire mis à jour avec succès',
        comment: expect.objectContaining({
          content: 'updated comment',
        }),
      });
    });
  
    it('should handle case where comment is not found', async () => {
      const commentId = 'nonexistentcomment';
      const profileId = 'user123';
      const req = {
        params: {
          commentId,
          profileId,
        },
        body: {
          content: 'updated comment',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking Comment.findById to return null (comment not found)
      jest.spyOn(Comment, 'findById').mockResolvedValue(null);
  
      await updateComment(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Commentaire non trouvé.',
      });
    });
  
    it('should handle case where user is not authorized to update the comment', async () => {
      const commentId = 'comment123';
      const profileId = 'user456'; // Different profileId than the one associated with the comment
      const req = {
        params: {
          commentId,
          profileId,
        },
        body: {
          content: 'updated comment',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking Comment.findById to return an existing comment
      jest.spyOn(Comment, 'findById').mockResolvedValue({
        _id: commentId,
        profileId: 'user123', // Original profileId associated with the comment
        content: 'original comment',
        creationDate: new Date(),
        save: jest.fn(),
      });
  
      await updateComment(req, res);
  
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Vous n\'êtes pas autorisé à mettre à jour ce commentaire.',
      });
    });
  
    it('should handle internal server error', async () => {
      const commentId = 'comment123';
      const profileId = 'user123';
      const req = {
        params: {
          commentId,
          profileId,
        },
        body: {
          content: 'updated comment',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking Comment.findById to throw an error
      jest.spyOn(Comment, 'findById').mockRejectedValue(new Error('Internal Server Error'));
  
      await updateComment(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erreur interne du serveur',
        error: 'Internal Server Error',
      });
    });
});  

    
      describe('deleteComment', () => {
        it('should delete a comment successfully', async () => {
          const commentId = 'comment123';
          const profileId = 'user123';
          const req = {
            params: {
              commentId,
              profileId,
            },
          };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
      
          // Mocking Comment.deleteOne to return a successful deletion
          jest.spyOn(Comment, 'deleteOne').mockResolvedValue({ deletedCount: 1 });
      
          await deleteComment(req, res);
      
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
            message: 'Commentaire supprimé avec succès',
          });
        });
      
        it('should handle case where comment is not found or user is not authorized to delete', async () => {
          const commentId = 'comment123';
          const profileId = 'user456'; // Different profileId than the one associated with the comment
          const req = {
            params: {
              commentId,
              profileId,
            },
          };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
      
          // Mocking Comment.deleteOne to return unsuccessful deletion (comment not found or unauthorized)
          jest.spyOn(Comment, 'deleteOne').mockResolvedValue({ deletedCount: 0 });
      
          await deleteComment(req, res);
      
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({
            message: 'Commentaire non trouvé ou vous n\'êtes pas autorisé à le supprimer.',
          });
        });
      
        it('should handle internal server error', async () => {
          const commentId = 'comment123';
          const profileId = 'user123';
          const req = {
            params: {
              commentId,
              profileId,
            },
          };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
      
          // Mocking Comment.deleteOne to throw an error
          jest.spyOn(Comment, 'deleteOne').mockRejectedValue(new Error('Internal Server Error'));
      
          await deleteComment(req, res);
      
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({
            message: 'Erreur interne du serveur',
            error: 'Internal Server Error',
          });
        });
      });
      describe('getCommentsByPoste', () => {
        it('should retrieve comments by posteId successfully', async () => {
            const posteId = 'profile123';
            const commentMock = [
                {
                    _id: 'comm1',
                    content: 'test comment',
                },
            ];

            // Configuring the mock for Comment.find
            const findMock = jest.fn();
            findMock.mockReturnValueOnce({
                sort: jest.fn().mockResolvedValueOnce(commentMock),
            });
            Comment.find = findMock;

            // Mocking request and response objects
            const req = { params: { posteId } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Calling the controller function
            await getCommentsByPoste(req, res);

            // Asserting that the status method is called with the expected value
            expect(res.status).toHaveBeenCalledWith(200);

            // Asserting that the json method is called with the expected value
            expect(res.json).toHaveBeenCalledWith({ message: 'Commentaires récupérés avec succès', comments: commentMock });
        });

        // ... (other test cases)
    });
    describe('getCommentById', () => {
      it('should retrieve a comment by commentId successfully', async () => {
          const profileId = 'profile123';
          const commentId = 'comment123';
          const commentMock = {
              _id: commentId,
              content: 'test comment',
              profileId: profileId,
          };

          // Mocking Comment.findById
          jest.spyOn(Comment, 'findById').mockResolvedValueOnce(commentMock);

          // Mocking request and response objects
          const req = { params: { profileId, commentId } };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          };

          // Calling the controller function
          await getCommentById(req, res);

          // Asserting that the status method is called with the expected value
          expect(res.status).toHaveBeenCalledWith(200);

          // Asserting that the json method is called with the expected value
          expect(res.json).toHaveBeenCalledWith({ message: 'Commentaire récupéré avec succès', comment: commentMock });
      });

      // Add other test cases for handling 400, 404, 403, and 500 status codes
      it('should handle case where commentId is missing in the request parameters', async () => {
          const profileId = 'profile123';
          const req = {
              params: {
                  profileId,
                  // commentId is missing
              },
          };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          };

          await getCommentById(req, res);

          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({
              message: 'commentId est requis dans les paramètres de la requête.',
          });
      });

      it('should handle case where the comment is not found', async () => {
          const profileId = 'profile123';
          const commentId = 'nonExistentComment';
          jest.spyOn(Comment, 'findById').mockResolvedValueOnce(null);

          const req = { params: { profileId, commentId } };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          };

          await getCommentById(req, res);

          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ message: 'Commentaire non trouvé.' });
      });

      it('should handle case where the user is not authorized to access the comment', async () => {
          const profileId = 'profile123';
          const commentId = 'comment123';
          const wrongProfileId = 'wrongProfile';
          const commentMock = {
              _id: commentId,
              content: 'test comment',
              profileId: 'differentProfileId',
          };

          jest.spyOn(Comment, 'findById').mockResolvedValueOnce(commentMock);

          const req = { params: { profileId: wrongProfileId, commentId } };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          };

          await getCommentById(req, res);

          expect(res.status).toHaveBeenCalledWith(403);
          expect(res.json).toHaveBeenCalledWith({
              message: 'Vous n\'êtes pas autorisé à accéder à ce commentaire.',
          });
      });

      it('should handle internal server error', async () => {
          const profileId = 'profile123';
          const commentId = 'comment123';
          jest.spyOn(Comment, 'findById').mockRejectedValueOnce(new Error('Internal Server Error'));

          const req = { params: { profileId, commentId } };
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          };

          await getCommentById(req, res);

          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({
              message: 'Erreur interne du serveur',
              error: 'Internal Server Error',
          });
      });
  });
});