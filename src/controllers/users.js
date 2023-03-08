const { createUser } = require('../services/users');

module.exports = {
  async createUser(req, res, next) {
    try {
      const { email, name } = req.body;
      const user = await createUser(email, name);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
};
