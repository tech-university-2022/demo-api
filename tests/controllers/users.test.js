const { createUser } = require('../../src/services/users');
const userController = require('../../src/controllers/users');

jest.mock('../../src/services/users', () => ({
  createUser: jest.fn(),
}));

describe('create user controller', () => {
  const mockJson = jest.fn();
  const mockNext = jest.fn();
  beforeEach(() => {
    createUser.mockClear();
    mockJson.mockClear();
    mockNext.mockClear();
  });

  it('should create user and send it in the response when user is created successfully', async () => {
    createUser.mockResolvedValue({
      email: 'jane_doe@gmail.com',
      name: 'Jane Doe',
      id: 1,
    });

    expect(mockJson).not.toHaveBeenCalled();
    await userController.createUser(
      {
        body: {
          email: 'jane_doe@gmail.com',
          name: 'Jane Doe',
        },
      },
      {
        json: mockJson,
      },
      mockNext,
    );
    expect(createUser).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledWith('jane_doe@gmail.com', 'Jane Doe');

    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith({
      email: 'jane_doe@gmail.com',
      name: 'Jane Doe',
      id: 1,
    });
  });

  it('should send error in next function when there is error in creating user', async () => {
    const mockError = new Error('ERROR!');
    createUser.mockRejectedValue(mockError);

    expect(mockNext).not.toHaveBeenCalled();
    await userController.createUser(
      {
        body: {
          email: 'jane_doe@gmail.com',
          name: 'Jane Doe',
        },
      },
      {
        json: mockJson,
      },
      mockNext,
    );
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
