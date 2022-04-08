/**
 * Album Controller 🗂
 */

const debug = require('debug')('albums:album_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');
 
 /**
* GET ALL 
*
*/
const showAll = async (req, res) => {

    // Lazy load 
    await req.user.load('albums');
 
    res.status(200).send({
        status: 'success',
        data: {
            albums: req.user.related('albums'),
        }
    })
}
 
/**
* GET ONE
*
* GET /:albumId
*/
const show = async (req, res) => {
    
    const user = await models.User.fetchById(req.user.id, { withRelated: ['albums'] });

    const userAlbums = user.related('albums');
 
    const album = userAlbums.find(album => album.id == req.params.albumId);

    if (!album) {
        return res.status(404).send({
            status: 'fail',
            data: "Album could not be found",
        });
    }

    const albumId = await models.Album.fetchById(req.params.albumId, { withRelated: ['photos']});
 
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
        return res.status(422).send({
            status: 'fail',
            data: errors.array() });
    }
 
    const validData = matchedData(req);
     
    validData.user_id = req.user.id;
 
    try {
        const album = await new models.Album(validData).save();
        debug('New album created: %O', album);
 
        res.status(200).send({
            status: 'success',
            data: album
        });
 
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new album'
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
        return res.status(422).send({
            status: 'fail',
            data: errors.array() });
    }

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
        const updatedAlbum = await album.save(validData);
        debug('Updated book successfully: %O', updatedAlbum);
 
        res.status(200).send({
            status: 'success',
            data: updatedAlbum
        });
 
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating an album'
        });
        throw error;
    }
}

/**
* Add a photo to an album
*
* POST /album/id/photo
*/
 
const addPhoto = async (req, res) => {
   
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: 'fail',
            data: errors.array() });
    }
 
    const validData = matchedData(req);
     
    const user = await models.User.fetchById(req.user.id, { withRelated: ['albums', 'photos'] });

    const albums = await models.Album.fetchById(req.params.albumId, { withRelated: ['photos']});
  
    const userAlbums = user.related('albums').find(album => album.id == req.params.albumId);
 
    if (!userAlbums) {
        return res.status(404).send({
            status: 'fail',
            data: "Album could not be found",
        });
    }

    const userPhotos = user.related('photos').find(photo => photo.id == validData.photo_id);

    if (!userPhotos) {
        return res.status(404).send({
            status: 'fail',
            data: "photo could not be found",
        });
    }

    const albumPhotos = albums.related('photos').find(photo => photo.id == validData.photo_id);
 
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
 
module.exports = {
    showAll,
    show,
    store,
    update,
    addPhoto
}