const prisma = require('../../client');
const { createUser } = require('../../src/services/users');

jest.mock('../../client', () => ({
  user: {
    create: jest.fn(),
  },
}));

describe('createUser', () => {
  it('should create user in database and return created user when data is correct', async () => {
    prisma.user.create.mockResolvedValue({
      email: 'jane_doe@gmail.com',
      name: 'Jane Doe',
      id: 1,
    });
    expect(prisma.user.create).toHaveBeenCalledTimes(0);
    const result = await createUser('jane_doe@gmail.com', 'Jane Doe');
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: 'jane_doe@gmail.com',
        name: 'Jane Doe',
      },
    });
    expect(result).toEqual({
      email: 'jane_doe@gmail.com',
      name: 'Jane Doe',
      id: 1,
    });
  });
});
