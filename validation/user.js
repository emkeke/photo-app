/**
 * 
 * Validation rules for user
 */

// conbined from app.js
const { body } = require('express-validator');

const toCreate_rules = [ 
   body('email').isEmail().normalizeEmail(),
   body('password').exists().isLength({ min: 4 }),
   body('first_name').exists().isLength({ min: 2 }),
   body('last_name').exists().isLength({ min: 2 }),
   /*
  body('email').exists().isEmail().custom(async value => {
		const user = await new models.User({ username: value }).fetch({ require: false });
		if (user) {
			return Promise.reject("Email already exists.");
		}

		return Promise.resolve();
	}),
  */
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