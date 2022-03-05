/**
 * 
 * Validation rules for user
 */

// conbined from app.js
const { body } = require('express-validator');
const models = require('../models');

const toCreate_rules = [ 
   body('title').exists().isLength({ min: 4 })
];

const toUpdate_rules = [

];


module.exports = {
    toCreate_rules,
    toUpdate_rules,
}