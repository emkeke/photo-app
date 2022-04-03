/**
 * 
 * Validation rules for albums
 */

// conbined from app.js
const { body } = require('express-validator');
const models = require('../models');
const Album = require('../models/Album');
const User = require('../models/User');

const toCreate_rules = [ 
   body('title').exists().isLength({ min: 4 }),
];

const toUpdate_rules = [
    body('title').optional().isLength({ min: 4 }),
];


module.exports = {
    toCreate_rules,
    toUpdate_rules,
}