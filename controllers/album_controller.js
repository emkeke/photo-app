/**
 * Album Controller 🗂
 */

 const debug = require('debug')('albums:album_controller');
 const models = require('../models');
 //const { matchedData, validationResult } = require('express-validator');
 
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
         .fetch();
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
     try {
         const album = await new models.Album(req.body).save();
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
 
 
 
 module.exports = {
     index,
     show,
     store,
     //update,
     //destroy,
 }
 