/**
 * Album Controller
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
     const all_albums = await models.Album.fetchAll();
 
     res.send({
         status: 'success',
         data: {
             users: all_albums
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
 

 module.exports = {
    index,
    show,
    //store,
    //update,
    //destroy,
}