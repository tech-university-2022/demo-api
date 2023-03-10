const request = require('supertest');
const { createUser } = require('../src/services/users');

const { app, server } = require('../src/app');

jest.mock('../src/services/users', () => ({
  createUser: jest.fn(),
}));
describe('App', () => {
  describe('POST /users', () => {
    it('should respond with a 200 status code and the created user', async () => {
      const user = {
        id: 1,
        name: 'Jane Doe',
        email: 'jane@gmail.com',
      };
      createUser.mockResolvedValueOnce(user);
      const response = await request(app).post('/api/users').send({
        name: 'Jane Doe',
        email: 'jane@gmail.com',
      });
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({ email: 'jane@gmail.com', id: 1, name: 'Jane Doe' });
    });

    it('should respond with a 400 status code and error message when request body is not valid', async () => {
      const response = await request(app).post('/api/users').send({
        name: 'Jane Doe',
      });
      expect(response.statusCode).toEqual(400);
      expect(response.body).toEqual({ message: '"email" is required' });
    });

    it('should respond with a 500 status code and error message when unexpected error happens', async () => {
      createUser.mockRejectedValueOnce(new Error('ERROR!'));
      const response = await request(app).post('/api/users').send({
        name: 'Jane Doe',
        email: 'jane@gmail.com',
      });
      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual({ message: 'Something unexpected happened' });
    });
  });

  afterAll(() => {
    server.close();
  });
});
