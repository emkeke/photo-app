/**
 * 
 * Validation rules for albums
 */

// conbined from app.js
const { body } = require('express-validator');
//const { addPhoto } = require('../controllers/album_controller');
const models = require('../models');
const Album = require('../models/Album');
const User = require('../models/User');

const toCreateRules = [ 
   body('title').exists().isLength({ min: 4 }),
];

const toUpdateRules = [
    body('title').optional().isLength({ min: 4 }),
];

const addPhoto = [
    body('photo_id').exists().isInt(),
];


module.exports = {
    toCreateRules,
    toUpdateRules,
    addPhoto
}