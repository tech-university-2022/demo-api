const router = require('express').Router();
const { createUser } = require('../../controllers/users');
const { generateValidationMiddleware } = require('../../middlewares/validation');
const { bodySchemaForCreateUser } = require('../../schemas/users');

router.post(
  '/',
  generateValidationMiddleware(bodySchemaForCreateUser),
  createUser,
);

module.exports = router;
