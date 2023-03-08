const joi = require('joi');

module.exports = {
  bodySchemaForCreateUser: joi.object({
    email: joi.string()
      .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
    name: joi.string().max(255).required(),
  }),
};
