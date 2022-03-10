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
     const albums = await models.Album.fetchAll();
 
     res.send({
         status: 'success',
         data: {
             albums
         }
     });
 }
 
 /**
  * GET ONE
  *
  * GET /:albumId
  */
 const show = async (req, res) => {
     const album = await new models.Album({ id: req.params.albumId })
         .fetch({ withRelated: ['photos'] });
         //{ withRelated: ['photos', 'user'] }
 
     res.send({
         status: 'success',
         data: {
            album,
         }
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

     try {
         const album = await new models.Album(validData).save();
         debug("POST new album: %o", album);

         res.send({
            status: 'success',
            data: {
                album,
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
  * Update an album
  *
  * PUT /:albumId
  */

  const update = async (req, res) => {
    const albumId = req.params.albumId;

    const album = await new models.Album({ id: albumId }).fetch({ require: false });
	if (!album) {
		debug("Album to update was not found. %o", { id: albumId });
		res.status(404).send({
			status: 'fail',
			data: 'Album Not Found',
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
        const updated_album = await album.save(validData);
        debug("Updated album successfully: %O", updated_album);

        res.send({
            status: 'success',
            data: {
                album,
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating a new album.',
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
     destroy,
 }
 