/**
 * Photo Controller 📷
 */

 const debug = require('debug')('albums:photo_controller');
 const models = require('../models');
 const { matchedData, validationResult } = require('express-validator');
 
 /**
  * GET ALL
  *
  * GET /
  */
 const index = async (req, res) => {
     const all_photos = await models.Photo.fetchAll();
 
     res.send({
         status: 'success',
         data: {
             photos: all_photos
         }
     });
 }
 
 /**
  * GET ONE
  *
  * GET /:photoId
  */
 const show = async (req, res) => {
     const photo = await new models.Photo({ id: req.params.photoId })
         .fetch({ withRelated: ['albums', 'user'] });
         //{ withRelated: ['album', 'user'] }
 
     res.send({
         status: 'success',
         data: {
             photo
         }
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
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// only the validated data
	const validData = matchedData(req);

    try {
        const photo = await new models.Photo(validData).save();
        debug("POST new photo: %o", photo);

        res.send({
           status: 'success',
           data: {
               photo,
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

/**
  * Update an photo
  *
  * PUT /:photoId
  */

 const update = async (req, res) => {
    const photoId = req.params.photoId;

    const photo = await new models.Photo({ id: photoId }).fetch({ require: false });
	if (!photo) {
		debug("Photo to update was not found. %o", { id: photoId });
		res.status(404).send({
			status: 'fail',
			data: 'Photo Not Found',
		});
		return;
	}


    try {
        const updated_photo = await photo.save(req.body);
        debug("Updated photo successfully: %O", updated_photo);

        res.send({
            status: 'success',
            data: {
                photo,
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating a new photo.',
        });
        throw error;
    }
}

/**
 * Destroy/ delete and specific photo
 *
 * DELETE /:photoId
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