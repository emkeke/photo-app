const express = require('express');
const router = express.Router();
//const validation_rules_forUser = require('../validation/user');
//const registerController = require('../controllers/register_controller')

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

router.use('/users', require('./users'));
router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));
router.use('/profile', require('./profile'));


// nre user 
//router.post('/', validation_rules_forUser.toCreate_rules);
//router.post('/register', validation_rules_forUser.toCreate_rules, registerController.register);

module.exports = router;
