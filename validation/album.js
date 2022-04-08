/**
 * 
 * Validation rules for albums
 */

const { body } = require('express-validator');
const models = require('../models');
 
const toCreateRules = [
    body('title').exists().isLength({ min: 3 }),
];

const toUpdateRules = [
    body('title').exists().isLength({ min: 3 }),
];
 
const addPhoto = [
    body('photo_id').exists().isInt(),
];
 
module.exports = {
    toCreateRules,
    toUpdateRules,
    addPhoto
}