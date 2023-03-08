const prisma = require('../../client');

module.exports = {
  async createUser(email, name) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return user;
  },
};
