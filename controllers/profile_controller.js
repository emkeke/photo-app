/**
 * Profile Controller 
 */

 const debug = require('debug')('albums:profile_controller');
 const { matchedData, validationResult } = require('express-validator');
 const models = require('../models');


 /**
  * GET user's profile
  *
  * GET /
  */

const profile_get = async (req, res) => {

	console.log('Hello from profileController', req.user);

	res.send({
		status: 'success',
		data: {
			user: req.user,
		}
	});
}
/*


/**
 * Update a user's profile
 *
 * PUT /
 */

 const profile_update = async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	const validData = matchedData(req);

	try {
		const updated_user = await req.user.save(validData);
		debug("Updated user successfully: %O", updated_user);

		res.send({
			status: 'success',
			data: {
				user: req.user,
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
 * Get user's albums
 *
 * GET /albums
 */

 const get_albums = async (req, res) => {
	//const userId = req.user.id;

	//const user = await new models.User({ id: req.user.id })
	//.fetch({ withRelated: ['albums', 'photos'] });

	await req.user.load('albums');
	await req.user.load('photos');

	res.status(200).send({
		status: 'success',
		data: {
			//albums: user.related('albums')
			albums: req.user.related('albums'),
			photos: req.user.related('photos'),
		}
		
	});
 }

const add_album = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	/* KANKSE HA KVAR????
	const albums = req.user.related('albums');

	let already_exists = false;
	albums.forEach(albums => {
		if (albums.id == validData.album_id) {
			exists = true;
		}
	});

	if (exists) {
		res.send({
            status: 'fail',
            data: 'albums already exists'
	}
	*/

	// ONLY the validated data
	const validData = matchedData(req);
	
	// attach validData with user_id
	validData.user_id = req.user.get('id');

     try {
        result = await new models.Album(validData).save();
        debug("POST new album: %o", result);

         res.send({
            status: 'success',
            data: {
                result
            }
         });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'When creating album exception thrown in database',
            });
            throw error;
        }
	
}


module.exports = {
	add_album,
	get_albums,
    profile_get,
	profile_update,
}

