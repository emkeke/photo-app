/**
 * Album Controller
 */

 const debug = require('debug')('albums:album_controller');
 const models = require('../models');
 const { matchedData, validationResult } = require('express-validator');
 
 /**
  * Get all resources
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
  * Get a specific resource
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
  * Store a new resource
  *
  * POST /
  */
 const store = async (req, res) => {
     /*
     const data = {
         username: req.body.username,
         password: req.body.password,
         first_name: req.body.first_name,
         last_name: req.body.last_name,
     };
     */
 
     const errors = validationResult(req);
     if (!errors.isEmpty()){
         return res.status(422).send({ status: 'fail', data: errors.array() })
     }
 
     const validData = matchedData(req);
 
     try {
         const album = await new models.Album(validData).save();
         debug("Created new album successfully: %O", album);
 
         res.send({
             status: 'success',
             data: {
                 album,
             },
         });
 
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database when creating a new album.',
         });
         throw error;
     }
 }
 
 /**
  * Update a specific resource
  *
  * POST /:userId
  */
 const update = async (req, res) => {
     const albumId = req.params.albumId;
 
     // make sure user exists
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
     if (!errors.isEmpty()){
         return res.status(422).send({ status: 'fail', data: errors.array() })
     }
 
     const validData = matchedData(req);
     /*
     const data = {};
 
     // update password if part of the request
     if (req.body.password) {
         data.password = req.body.password;
     }
 
     // update first_name if part of the request
     if (req.body.first_name) {
         data.first_name = req.body.first_name;
     }
 
     // update last_name if part of the request
     if (req.body.last_name) {
         data.last_name = req.body.last_name;
     }*/
 
 
     try {
         const updatedAlbum = await album.save(validData);
         debug("Updated album successfully: %O", updatedAlbum);
 
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
  * Destroy a specific resource
  *
  * DELETE /:userId
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
 