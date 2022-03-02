/**
 * User Controller 🤓
 */

 const debug = require('debug')('albums:user_controller');
 const models = require('../models');
 const { matchedData, validationResult } = require('express-validator');
 
 /**
  * GET ALL
  *
  * GET /
  */
 const index = async (req, res) => {
     const all_users = await models.User.fetchAll();
 
     res.send({
         status: 'success',
         data: {
             users: all_users
         }
     });
 }
 
 /**
  * GET ONE
  *
  * GET /:userId
  */
 const show = async (req, res) => {
     const user = await new models.User({ id: req.params.userId })
         .fetch({ withRelated: ['albums'] });
 
     res.send({
         status: 'success',
         data: {
             user,
         }
     });
 }
 
 
 
 module.exports = {
     index,
     show,
     //store,
     //update,
     //destroy,
 }
 