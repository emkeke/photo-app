/**
 * PHOTO ROUTER
 */

const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const validationRulesPhoto = require('../validation/photo');

/* GET ALL */
router.get('/', photoController.showAll);

/* GET ONE */
router.get('/:photoId', photoController.show);

/* POST new photo */
router.post('/', validationRulesPhoto.toCreateRules, photoController.store);

/* PUT update photo */
router.put('/:photoId', validationRulesPhoto.toUpdateRules, photoController.update);

module.exports = router;