/**
 * INDEX ROUTER
 * 
 */

const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const userValidationRules = require('../validation/user');
const userController = require('../controllers/user_controller');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

router.use('/albums', auth.basic, require('./albums'));
router.use('/photos', auth.basic, require('./photos'));

router.post('/register', userValidationRules.toCreateRules, userController.register);

module.exports = router;