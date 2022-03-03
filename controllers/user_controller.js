/**
 * User Controller 🤓
 */

 const debug = require('debug')('albums:user_controller');
 const models = require('../models');
 //const { matchedData, validationResult } = require('express-validator');
 
 /**
  * GET ALL
  *
  * GET /
  */
 const index = async (req, res) => {
     const users = await models.User.fetchAll();
 
     res.send({
         status: 'success',
         data: {
             users,
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
         .fetch();
         //{ withRelated: ['albums'] }
 
     res.send({
         status: 'success',
         data: {
             user,
         }
     });
 }

 /**
  * Store new user
  *
  * POST /user
  */

  const store = async (req, res) => {
    try {
        const user = await new models.User(req.body).save();
        debug("POST new user: %o", user);

        res.send({
           status: 'success',
           data: {
               user,
           }
        });
       } catch (error) {
           res.status(500).send({
               status: 'error',
               message: 'When creating user exception thrown in database',
           });
           throw error;
       }
}

 /**
  * Update an album
  *
  * PUT /:albumId
  */

  const update = async (req, res) => {
    const userId = req.params.userId;
    
    const user = await new models.User({ id: userId }).fetch({ require: false });
	if (!user) {
		debug("User to update was not found. %o", { id: userId });
		res.status(404).send({
			status: 'fail',
			data: 'User Not Found',
		});
		return;
	}


    try {
        const updated_user = await user.save(req.body);
        debug("Updated user successfully: %O", updated_user);

        res.send({
            status: 'success',
            data: {
                user,
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating a new user.',
        });
        throw error;
    }
}

 
 
 
 module.exports = {
     index,
     show,
     store,
     update,
     //destroy,
 }
 