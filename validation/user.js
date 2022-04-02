/**
 * 
 * Validation rules for user
 */
 const { body } = require('express-validator');

 const toCreate_rules = [ 
     body('email').exists().isEmail().custom(async value => {
         const email = await new models.User({ email: value }).fetch({ require: false });
         if (email) {
             return Promise.reject('A user with this email already exists');
         }
         return Promise.resolve();
     }),
     body('password').exists().isLength({ min: 6 }),
     body('first_name').exists().isLength({ min: 2 }),
     body('last_name').exists().isLength({ min: 2 }),
  ];
 
 const toUpdate_rules = [
     body('password').optional().isLength({ min: 6 }),
     body('first_name').optional().isLength({ min: 2 }),
     body('last_name').optional().isLength({ min: 2 }),
 ];
 
 
 module.exports = {
     toCreate_rules,
     toUpdate_rules,
 }