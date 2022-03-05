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
   body('user_id').exists().bail().custom(async value => {
    const user = await new models.User({ id: value }).fetch({ require: false });
    if (!user) {
        return Promise.reject(`User with ID ${value} does not exist.`);
    }

    return Promise.resolve();
}),
];

const toUpdate_rules = [

];


module.exports = {
    toCreate_rules,
    toUpdate_rules,
}