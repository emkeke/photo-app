/**
 * Album ROUTER
 */

const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const validationRulesAlbum = require('../validation/album');

/* GET ALL */
router.get('/', albumController.showAll);

/* GET ONE */
router.get('/:albumId', albumController.show);

/* POST new album */
router.post('/', validationRulesAlbum.toCreateRules, albumController.store);

/* PUT update album */
router.put('/:albumId', validationRulesAlbum.toUpdateRules, albumController.update);

/* POST new photo to album */
router.post('/:albumId/photos', validationRulesAlbum.addPhoto, albumController.addPhoto);

module.exports = router;