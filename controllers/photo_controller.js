/**
* Photo Controller 📷
*/

const debug = require('debug')('albums:photo_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');
 
/**
* GET ALL
*
*/

const showAll = async (req, res) => {

    // Lazy load
    await req.user.load('photos');
    
    res.status(200).send({
        status: 'success',
        data: {
            photos: req.user.related('photos'),
        }
    })
}

/**
* GET ONE
*
* GET /:photoId
*/

const show = async (req, res) => {
  
    const user = await models.User.fetchById(req.user.id, { withRelated: ['photos'] });

    const userPhotos = user.related('photos');

    const photo = userPhotos.find(photo => photo.id == req.params.photoId);

    if (!photo) {
		return res.status(404).send({
			status: 'fail',
			data: "Photo could not be found",
		});
	}
    res.status(200).send({
        status: 'success',
        data: photo
    });
}

/**
* Store new photo
*
* POST /photo
*/

const store = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: 'fail',
            data: errors.array() });
    }


    const validData = matchedData(req);

    validData.user_id = req.user.id;

    try {
        const photo = await new models.Photo(validData).save();
        debug('New photo created: %O', photo);

        res.status(200).send({
            status: 'success',
            data: photo
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new photo'
        });
        throw error;
    }
}


/**
* Update an photo
*
* PUT /:photoId
*/

const update = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: 'fail',
            data: errors.array() });
    }

    const validData = matchedData(req);

    const user = await models.User.fetchById(req.user.id, { withRelated: ['photos'] });

    const userPhotos = user.related('photos');

    const photo = userPhotos.find(photo => photo.id == req.params.photoId);
    
    if (!photo) {
		return res.status(404).send({
			status: 'fail',
			data: "Photo could not be found",
		});
	}

    try {
        const updatedPhoto = await photo.save(validData);
        debug('Updated photo successfully: %O', updatedPhoto);

        return res.status(200).send({
            status: 'success',
            data: updatedPhoto
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating an photo'
        });
        throw error;
    }
}

module.exports = {
	showAll,
	show,
	store,
	update
}