/**
 * Photo Controller 📷
 */

 const debug = require('debug')('albums:photo_controller');
 const models = require('../models');
 //const { matchedData, validationResult } = require('express-validator');
 
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
  * GET /:albumId
  */
 const show = async (req, res) => {
     const photo = await new models.Photo({ id: req.params.photoId })
         .fetch();
         //{ withRelated: ['album', 'user'] }
 
     res.send({
         status: 'success',
         data: {
             photo,
         }
     });
 }

 /**
  * Store new photo
  *
  * POST /photo
  */

  const store = async (req, res) => {
    try {
        const photo = await new models.Photo(req.body).save();
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

 

 module.exports = {
    index,
    show,
    store,
    //update,
    //destroy,
}