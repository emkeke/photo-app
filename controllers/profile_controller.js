/**
 * Profile Controller 
 */
const bcrypt = require('bcrypt');
const debug = require('debug')('albums:profile_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

 /**
  * GET user's profile
  *
  * GET /
  */

const profile_get = async (req, res) => {

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

	if (validData.password) {
		try {
			const hashedpassword = await bcrypt.hash(validData.password, 10);
			validData.password = hashedpassword; 
	 
		 } catch (error) {
			 res.status(500).send({
				 status: 'error',
				 message: 'Exception thrown when hashing the password.',
			 });
			 throw error;
		 }
	}

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

	await req.user.load('albums');
	//await req.user.load('photos');

	res.status(200).send({
		status: 'success',
		data: {
			albums: req.user.related('albums'),
		}
		
	});
 }


 const get_photos = async (req, res) => {

	await req.user.load('photos');

	res.status(200).send({
		status: 'success',
		data: {
			photos: req.user.related('photos'),
		}
		
	});
 }

/***
 * 
 * GET album by ID
 */

const album_byID = async (req, res) => {
	const album = await models.Album({ id: req.params.albumId })
	.fetch({ withRelated: ['albums'] });

	res.status(200).send({
		status: 'success',
		data: {
			album,
		}
		
	});

}

/**
 * 
 * ADD an album to profile
 */

const add_album = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	const validData = matchedData(req);
	
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

/**
 * 
 * ADD a photo to a profile
 */


 const add_photo = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	const validData = matchedData(req);
	
	validData.user_id = req.user.get('id');

     try {
        photoAdded = await new models.Photo(validData).save();
        debug("POST new photo: %o", photoAdded);

         res.send({
            status: 'success',
            data: {
                photoAdded,
            }
         });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'When creating photo exception thrown in database',
            });
            throw error;
        }
	
}

module.exports = {
	add_album,
	add_photo,
	get_albums,
	get_photos,
	album_byID,
    profile_get,
	profile_update,
}

