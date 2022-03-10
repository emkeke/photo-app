/**
 * 
 * Validation rules for user
 */
const { body } = require('express-validator');

const toCreate_rules = [ 
   body('email').isEmail().normalizeEmail(),
   body('password').exists().isLength({ min: 4 }),
   body('first_name').exists().isLength({ min: 2 }),
   body('last_name').exists().isLength({ min: 2 }),
];

const toUpdate_rules = [
 body('password').optional().isLength({ min: 4 }),
 body('first_name').optional().isLength({ min: 2 }),
 body('last_name').optional().isLength({ min: 2 }),
];


module.exports = {
    toCreate_rules,
    toUpdate_rules,
}