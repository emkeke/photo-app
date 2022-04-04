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
const index = async (req, res) => {
    
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
    }catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating an album'
        });
        throw error;
    }
}