const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
// exports the content from validation user
const validation_rules_forUser = require('../validation/user');

/* GET ALL */
router.get('/', userController.index);

/* GET ALL */
router.get('/:userId', userController.show);

/* POST new user */
router.post('/', validation_rules_forUser.toCreate_rules, userController.store);

/* PUT update album */
router.put('/:userId', userController.update);

/* Destroy a specific resource */
router.delete('/:userId', userController.destroy);

module.exports = router;