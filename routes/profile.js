/*
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
// exports the content from validation user
const validation_rules_forProfile = require('../validation/profile');

/* GET a user's profile 
router.get('/', profileController.profile_get);

/* PUT update user's profile 
router.put('/', validation_rules_forProfile.toUpdate_rules, profileController.profile_update);

/* GET a user's album 
router.get('/:albums', profileController.get_albums);

router.post('/albums', validation_rules_forProfile.add_album_rules, profileController.add_album);

module.exports = router;
*/