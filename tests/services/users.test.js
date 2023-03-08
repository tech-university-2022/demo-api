const { createUser } = require('../../src/services/users');

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    user: {
      create: jest.fn(() => ({
        id: 1,
        name: 'Jane Doe',
        email: 'jane@gmail.com',
      })),
    },
  })),
}));

describe('createUser', () => {
  it('should create new user', async () => {
    const user = {
      id: 1,
      name: 'Jane Doe',
      email: 'jane@gmail.com',
    };
    await expect(createUser(user.email, user.name)).resolves.toEqual(user);
  });
});
