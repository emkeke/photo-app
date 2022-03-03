const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
/*const photoValidationRules = require('../validation/photo')

/* GET ALL */
router.get('/', photoController.index);

/* GET ONE */
router.get('/:photoId', photoController.show);

/* POST new photo */
router.post('/', photoController.store);

module.exports = router;