const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
/*const userValidationRules = require('../validation/user')

/* Get all resources */
router.get('/', albumController.index);

/* Get a specific resource */
router.get('/:albumId', albumController.show);

/* Store a new resource */ /*
router.post('/', userValidationRules.createRules, userController.store);

/* Update a specific resource */ /*
router.put('/:userId', userValidationRules.updateRules, userController.update);

/* Destroy a specific resource *//*
router.delete('/:userId', userController.destroy);
*/
module.exports = router;