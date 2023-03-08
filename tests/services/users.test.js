const prisma = require('../../client');
const { createUser } = require('../../src/services/users');

jest.mock('../../client', () => ({
  user: {
    create: jest.fn(),
  },
}));

describe('createUser', () => {
  it('should create new user', async () => {
    const user = {
      id: 1,
      name: 'Jane Doe',
      email: 'jane@gmail.com',
    };
    prisma.user.create.mockResolvedValueOnce(user);
    expect(prisma.user.create).not.toHaveBeenCalled();
    const result = await createUser('jane@gmail.com', 'Jane Doe');
    expect(result).toEqual(user);
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: 'jane@gmail.com',
        name: 'Jane Doe',
      },
    });
  });
});
