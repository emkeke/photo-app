const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const validation_rules_forAlbum = require('../validation/album');

/* GET ALL */
router.get('/', albumController.index);

/* GET ALL */
router.get('/:albumId', albumController.show);

/* POST new album */
router.post('/', validation_rules_forAlbum.toCreate_rules, albumController.store);

/* PUT update album */
router.put('/:albumId', albumController.update);

/* Destroy a specific resource */
router.delete('/:albumId', albumController.destroy);


module.exports = router;