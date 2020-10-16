const { Router } = require('express');

const router = Router();

router.use('/cities', require('./cities'));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

router.use(unknownEndpoint);

module.exports = router;
