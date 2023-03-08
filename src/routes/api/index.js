const router = require('express').Router();
const { handleErrors } = require('../../middlewares/errorHandler');
const userRoutes = require('./users');

router.use('/users', userRoutes);

router.use(handleErrors);

module.exports = router;
