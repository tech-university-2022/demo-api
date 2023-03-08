const { createUser } = require('../../src/controllers/users');
const userServices = require('../../src/services/users');

jest.mock('../../src/services/users', () => ({
  createUser: jest.fn(),
}));

describe('createUser', () => {
  const mockJson = jest.fn();
  const mockNext = jest.fn();
  beforeEach(() => {
    userServices.createUser.mockClear();
    mockJson.mockClear();
    mockNext.mockClear();
  });
  it('should create new user and send it in the response', async () => {
    const user = {
      id: 1,
      name: 'Jane Doe',
      email: 'jane@gmail.com',
    };
    userServices.createUser.mockResolvedValueOnce(user);
    expect(mockJson).not.toHaveBeenCalled();
    expect(userServices.createUser).not.toHaveBeenCalled();
    await createUser(
      { body: { email: user.email, name: user.name } },
      { json: mockJson },
      mockNext,
    );
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith(user);
    expect(userServices.createUser).toHaveBeenCalledTimes(1);
    expect(userServices.createUser).toHaveBeenCalledWith(user.email, user.name);
  });
  it('should return error when there is error in creating user', async () => {
    const user = {
      id: 1,
      name: 'Jane Doe',
      email: 'jane@gmail.com',
    };
    const mockError = new Error('ERROR!');
    userServices.createUser.mockRejectedValueOnce(mockError);
    expect(mockNext).not.toHaveBeenCalled();
    await createUser({ body: user.email, email: user.name }, { json: mockJson }, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
