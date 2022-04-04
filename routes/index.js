/**
 * INDEX ROUTER
 * 
 */
 const auth =require('../middlewares/auth');
 const express = require('express');
 const router = express.Router();
 const validationRulesUser = require('../validation/user');
 const registerController = require('../controllers/register_controller')
 
 /* GET / */
 router.get('/', (req, res, next) => {
	 res.send({ success: true, data: { msg: 'oh, hi' }});
 });
 
 
 router.use('/albums', require('./albums'));
 router.use('/photos', require('./photos'));
 router.use('/profile', auth.basic, require('./profile'));
 
 router.post('/register', validationRulesUser.toCreateRules, registerController.register);
 
 module.exports = router;