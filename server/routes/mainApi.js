const router = require('express').Router();

const apiPeopleRouter = require('./apis/people');

router.use('/people', apiPeopleRouter);

module.exports = router;