/**
 * 
 * Validation rules for photos
 */


const { urlencoded } = require('express');
const { body } = require('express-validator');


const toCreate_rules = [ 
   body('title').exists().isLength({ min: 4 }),
   body('url').exists().isURL(),
   body('comment').optional().isLength({ min: 4 }),
];

const toUpdate_rules = [
    body('title').optional().isLength({ min: 4 }),
    body('url').optional().isURL(),
    body('comment').optional().isLength({ min: 4 }),
];


module.exports = {
    toCreate_rules,
    toUpdate_rules,
}
