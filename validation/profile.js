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
    body('title').exists().isLength({ min: 4 }),
 ];

 const add_photo_rules = [
    body('title').exists().isLength({ min: 4 }),
    body('url').exists().isURL(),
    body('comment').optional().isLength({ min: 4 }),  
 ];
 
 module.exports = {
     add_album_rules,
     add_photo_rules,
     toUpdate_rules,
 }
 