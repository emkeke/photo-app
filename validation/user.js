/**
 * 
 * Validation rules for user
 */

// conbined from app.js
const { body } = require('express-validator');

const toCreate_rules = [ 

    body('email').exists().isEmail().normalizeEmail(),
    /*
    body('email').custom(value => {
        return User.findUserByEmail(value).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
    */
   body('password').exists().isLength({ min: 4 }),
   body('first_name').exists().isLength({ min: 2 }),
   body('last_name').exists().isLength({ min: 2 }),
];

const toUpdate_rules = [

];


module.exports = {
    toCreate_rules,
    toUpdate_rules,
}