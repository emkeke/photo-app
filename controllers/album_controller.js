/**
 * Album Controller 🗂
 */

 const debug = require('debug')('albums:album_controller');
 const models = require('../models');
 const { matchedData, validationResult } = require('express-validator');
 
 /**
  * GET ALL 
  *
  * GET /
  */
const index = async (req, res) => {
    
    // Lazy load
    await req.user.load('albums');
 
    res.send({
        status: 'success',
        data: {
            albums: req.user.related('albums')
        }
    });
}
 
 /**
  * GET ONE
  *
  * GET /:albumId
  */
const show = async (req, res) => {
    
    const user = await models.User.fetchById(req.user.id, { withRelated: ['albums'] });
    // kanske ändra variabelnamnet
    const userAlbums = user.related('albums');
    
    const album = userAlbums.find(album => album.id == req.params.albumId);
    if (!album) {
        return res.status(404).send({
            status: 'fail',
            data: "Album could not be found",
        });
    }
    
    const albumId = await models.Album.fetchById(req.params.albumId, {
        withRelated: ['photos'] });

     res.status(200).send({
         status: 'success',
         data: albumId
     });
 }

 /**
  * Store new album
  *
  * POST /album
  */

 const store = async (req, res) => {

    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}
	const validData = matchedData(req);

    validData.user_id = req.user.id;

     try {
         const album = await new models.Album(validData).save();
         debug("POST new album: %o", album);

         res.send({
            status: 'success',
            data: album
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
  * Update an album
  *
  * PUT /:albumId
  */

const update = async (req, res) => {

    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// only the validated data
	const validData = matchedData(req);

    const user = await models.User.fetchById(req.user.id, { withRelated: ['albums'] });
    const userAlbums = user.related('albums');

    const album = userAlbums.find(album => album.id == req.params.albumId);
    if (!album) {
        return res.status(404).send({
            status: 'fail',
            data: "Album could not be found",
        });
    }

    try {
        const updated_album = await album.save(validData);
        debug("Updated album successfully: %O", updated_album);

        res.send({
            status: 'success',
            data: updated_album
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating a new album.',
        });
        throw error;
    }
}

const addPhoto = async (req, res) => {
    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: 'fail',
            data: errors.array() });
    }

    // Get the validated data
    const validData = matchedData(req);
    
    // Get user with all the related albums and photos and then get requested id
    const user = await models.User.fetchById(req.user.id, { withRelated: ['albums', 'photos'] });
    const userAlbums = user.related('albums').find(album => album.id == req.params.albumId);
    const userPhotos = user.related('photos').find(photo => photo.id == validData.photo_id);

    // Get album with all the related photos and then get requested id
    const albums = await models.Album.fetchById(req.params.albumId, { withRelated: ['photos']});
    const albumPhotos = albums.related('photos').find(photo => photo.id == validData.photo_id);
    debug('Updated book successfully: %O', userPhotos);

    // Check if album with requested id exists
    if (!userAlbums) {
        return res.status(404).send({
            status: 'fail',
            data: "Album could not be found",
        });
    }

    // Check if photo with requested id exists
    if (!userPhotos) {
        return res.status(404).send({
            status: 'fail',
            data: "photo could not be found",
        });
    }

    // check if photo is already in the albums's list of photos
    if (albumPhotos) {
        return res.status(409).send({
            status: 'fail',
            data: 'Photo already exists.',
        });
    }

    try {
        const result = await albums.photos().attach(validData.photo_id);
        debug("Added photo to album successfully: %O", result);

        res.status(200).send({
            status: 'success',
            data: null,
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when adding a photo to a album.',
        });
        throw error;
    }
}

/**
 * Destroy/ delete and specific album
 *
 * DELETE /:albumId
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
    addPhoto
}
 