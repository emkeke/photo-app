const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const validation_rules_forAlbum = require('../validation/album');

/* GET ALL */
router.get('/', albumController.index);

/* GET ONE */
router.get('/:albumId', albumController.show);

/* POST new album */
router.post('/', validation_rules_forAlbum.toCreate_rules, albumController.store);

/* PUT update album */
router.put('/:albumId', validation_rules_forAlbum.toUpdate_rules, albumController.update);

/* Destroy a specific resource */
router.delete('/:albumId', albumController.destroy);

/* POST new photo to album */
router.post('/:albumId/photos', validation_rules_forAlbum.add_Photo, albumController.add_Photo);


module.exports = router;