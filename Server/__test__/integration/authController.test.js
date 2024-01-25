const request = require('supertest');
const app = require('../../server'); 
const User = require('../../models/userModel'); 

describe('Authentication Integration Tests', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'testpassword',
  };
  beforeAll(async () => {
    await User.deleteMany();
  });
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/user/signup')
      .send(testUser)
      .expect(200);
    expect(response.body.email).toBe(testUser.email);
    expect(response.body).toHaveProperty('token');
  });
  it('should log in an existing user', async () => {
    const response = await request(app)
      .post('/api/user/login') 
      .send(testUser)
      .expect(200);
    expect(response.body.email).toBe(testUser.email);
    expect(response.body).toHaveProperty('token');
  });
});
