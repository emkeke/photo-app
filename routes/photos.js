const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const validation_rules_forPhoto = require('../validation/photos');

/* GET ALL */
router.get('/', photoController.index);

/* GET ONE */
router.get('/:photoId', photoController.show);

/* POST new photo */
router.post('/',validation_rules_forPhoto.toCreate_rules, photoController.store);

/* PUT update photo */
router.put('/:photoId', validation_rules_forPhoto.toUpdate_rules, photoController.update);


module.exports = router;