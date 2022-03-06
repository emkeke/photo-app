/**
 * Validation rules for profile
 */

 const { body } = require('express-validator');
 const models = require('../models');
 
 /**
  * Update Profile 
  *
  */
 const toUpdate_rules = [
     body('password').optional().isLength({ min: 4 }),
     body('first_name').optional().isLength({ min: 2 }),
     body('last_name').optional().isLength({ min: 2 }),
 ];
 
 /**
  * Add album to profile
  *
  */
 const add_album_rules = [
     body('album_id').exists().bail().custom(async value => {
         const album = await new models.Album({ id: value }).fetch({ require: false });
         if (!album) {
             return Promise.reject(`Album with ID ${value} does not exist.`);
         }
 
         return Promise.resolve();
     }),
 ];
 
 module.exports = {
     add_album_rules,
     toUpdate_rules,
 }