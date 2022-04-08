/**
 * Album Controller 🗂
 */

 const debug = require('debug')('albums:album_controller');
 const models = require('../models');
 const { matchedData, validationResult } = require('express-validator');
 
/**
* GET ALL 
*
*/
const showAll = async (req, res) => {
    
    // Lazy load
    await req.user.load('albums');
    
    // send success and require the user albums
    res.status(200).send({
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

         res.status(200).send({
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
    const userAlbum = user.related('albums');

    const album = userAlbum.find(album => album.id == req.params.albumId);
    if (!album) {
        return res.status(404).send({
            status: 'fail',
            data: "Album could not be found",
        });
    }

    try {
        const updateAlbum = await album.save(validData);
        debug("Updated album successfully: %O", updateAlbum);

        res.status(200).send({
            status: 'success',
            data: updateAlbum
        });

    }catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating an album'
        });
        throw error;
    }
}

const addPhoto = async (req, res) => {

    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

    const validData = matchedData(req);

    const user = await models.User.fetchById(req.user.id, { withRelated: ['albums', 'photos'] });

    const userAlbum = user.related('albums')
        .find(album => album.id == req.params.albumId);

    if (!userAlbum) {
        return res.status(404).send({
            status: 'fail',
            data: "Album could not be found",
        });
    }

    const userPhoto = user.related('photos')
        .find(photo => photo.id == validData.photo_id);

    if (!userPhoto) {
        return res.status(404).send({
            status: 'fail',
            data: "Photo could not be found",
        });
    }

    const album = await models.Album.fetchById(req.params.albumId, { withRelated: ['photos']});

    const albumPhotos = album.related('photos')
        .find(photo => photo.id == validData.photo_id);

    debug('Updated book successfully: %O', userPhoto);

    if (albumPhotos) {
        return res.status(409).send({
            status: 'fail',
            data: 'Photo already exists.',
        });
    }

    try {
        const addPhotos = await album.save(validData);
        debug("Added photo successfully: %O", addPhotos);

        res.status(200).send({
            status: 'success',
            data: null,
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating an album'
        });
        throw error;
    }
}

module.exports = {
	showAll,
	show,
	store,
	update,
    addPhoto
}