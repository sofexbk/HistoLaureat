const { signupUser,loginUser } = require('../../controllers/userController.js');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));
jest.mock('../../models/userModel', () => ({
  login: jest.fn(),
  signup: jest.fn()
}));

describe('loginUser', () => {
  it('should successfully log in a user with valid email and password', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockUser = { _id: '123', role: 'user' };
    jwt.sign.mockReturnValueOnce('token123');
    User.login.mockResolvedValueOnce(mockUser);
    await loginUser(req, res);
    expect(User.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(jwt.sign).toHaveBeenCalledWith({ _id: '123' }, process.env.SECRET, { expiresIn: '50d' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com', token: 'token123', role: 'user' });
  });
});
describe('signupUser', () => {
  it('should successfully sign up a user with valid email, password, role, and confirmPassword', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
        confirmPassword: 'password123'
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockUser = { _id: '123', role: 'user' };
    jwt.sign.mockReturnValueOnce('token123');
    User.signup.mockResolvedValueOnce(mockUser);
    await signupUser(req, res);
    expect(User.signup).toHaveBeenCalledWith('test@example.com', 'password123', 'password123', 'user');
    expect(jwt.sign).toHaveBeenCalledWith({ _id: '123' }, process.env.SECRET, { expiresIn: '50d' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com', token: 'token123', role: 'user' });
  });
});