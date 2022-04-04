/**
 * 
 * Validation rules for photos
 */


 const { urlencoded } = require('express');
 const { body } = require('express-validator');
 
 
 const toCreateRules = [ 
    body('title').exists().isLength({ min: 4 }),
    body('url').exists().isURL(),
    body('comment').optional().isLength({ min: 4 }),
 ];
 
 const toUpdateRules = [
     body('title').optional().isLength({ min: 4 }),
     body('url').optional().isURL(),
     body('comment').optional().isLength({ min: 4 }),
 ];
 
 
 module.exports = {
     toCreateRules,
     toUpdateRules,
 }