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
    
    // check validation 
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	//only the validated data 
	const validData = matchedData(req);

    try {
        const user = await new models.User(validData).save();
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
  * Update an user
  *
  * PUT /:userId
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

    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// only the validated data
	const validData = matchedData(req);


    try {
        const updated_user = await user.save(validData);
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


/**
 * Destroy/ delete and specific user
 *
 * DELETE /:userId
 */
 const destroy = (req, res) => {
    res.status(405).send({
        status: 'fail',
        message: 'Method Not Allowed.',
    });
}
 
 
 
 
 module.exports = {
     index,
     show,
     store,
     update,
     destroy,
 }
 