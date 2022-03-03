const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
/*const userValidationRules = require('../validation/user')

/* GET ALL */
router.get('/', userController.index);

/* GET ALL */
router.get('/:userId', userController.show);

/* POST new user */
router.post('/', userController.store);

module.exports = router;