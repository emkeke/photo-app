const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
/*const userValidationRules = require('../validation/user')

/* GET ALL */
router.get('/', albumController.index);

/* GET ALL */
router.get('/:albumId', albumController.show);

/* POST new album */
router.post('/', albumController.store);

/* PUT update album */
router.put('/:albumId', albumController.update);

/* Destroy a specific resource */
router.delete('/:albumId', albumController.destroy);


module.exports = router;