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
	res.send({
		status: 'success',
		data: {
			user: null,
			//req.user,
		}
	});
}
/*

const profile_get = async (req, res) => {
	try {
		const user = await User.fetchById(req.user.user_id);

		res.send({
			status: 'success',
			data: {
				user,
			}
		});
	} catch (error) {
		return res.sendStatus(404);
	}
}


/**
 * Update a user's profile
 *
 * PUT /
 */

 const profile_update = async (req, res) => {
	res.status(405).send({
		status: 'error',
		message: 'This is a test',
		
	});
 }
	/*
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	const validData = matchedData(req);

	if (validData.password) {
		try {
			validData.password = await bcrypt.hash(validData.password, models.User.hashSaltRounds);

		} catch (error) {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown when hashing the password.',
			});
			throw error;
		}
	}

	try {
		const user = await User.fetchById(req.user.user_id);

		const updatedUser = await user.save(validData);
		debug("Updated user successfully: %O", updatedUser);

		res.send({
			status: 'success',
			data: {
				user: updatedUser,
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

	/*
	try {
		const updated_user = await req.user.save(validData);
		debug("Updated user successfully: %O", updated_user);

		res.send({
			status: 'success',
			data: {
				user: updated_user,
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
*/

/**
 * Get user's albums
 *
 * GET /albums
 */

 const get_albums = async (req, res) => {
	res.status(405).send({
		status: 'error',
		message: 'This is a test',
		
	});
 }
	// get user and also eager-load the books-relation
	// const user = await new models.User({ id: req.user.id })
	// 	.fetch({ withRelated: ['books'] });
	//const user = await user.fetchById(req.user.user_id, { withRelated: ['albums'] });

	// "lazy load"
	//await req.user.load('albums');
	/*
	res.status(200).send({
		status: 'success',
		data: {
			albums: req.user.related('albums'),
		},
	});
}

const add_album = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	// lazy-load book relationship
	//await req.user.load('albums');

	// fetch user and eager-load books relation
	const user = await user.fetchById(req.user.user_id, { withRelated: ['albums'] });

	// get the user's books
	const albums = req.user.related('albums');

	// check if book is already in the user's list of books
	const existing_album = albums.find(album => album.id == validData.album_id);

	// if it already exists, bail
	if (existing_album) {
		return res.send({
			status: 'fail',
			data: 'Album already exists.',
		});
	}

	try {
		const result = await req.user.albums().attach(validData.album_id);
		debug("Added album to user successfully: %O", result);

		res.send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a album to a user.',
		});
		throw error;
	}
}
*/

module.exports = {
    profile_get,
	profile_update,
	get_albums,
	//add_album,
}