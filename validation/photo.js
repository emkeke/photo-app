/**
 * 
 * Validation rules for photos
 */

const { body } = require('express-validator');
const models = require('../models');

const toCreateRules = [
    body('title').exists().isLength({ min: 3 }),
    body('url').exists().isURL(),
    body('comment').optional().isLength({ min: 3 }),
];
 
const toUpdateRules = [
    body('title').optional().isLength({ min: 3 }),
    body('url').optional().isURL(),
    body('comment').optional().isLength({ min: 3 }),
];
 
module.exports = {
    toCreateRules,
    toUpdateRules,
}