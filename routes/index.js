const express = require('express');
const router = express.Router();
const validation_rules_forUser = require('../validation/user');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

router.use('/users', require('./users'));
router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));

// nre user 
router.post('/', validation_rules_forUser.toCreate_rules);

module.exports = router;
