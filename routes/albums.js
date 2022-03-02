const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
/*const userValidationRules = require('../validation/user')

/* GET ALL */
router.get('/', albumController.index);

/* GET ALL */
router.get('/:albumId', albumController.show);


module.exports = router;