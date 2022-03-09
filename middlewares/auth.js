/**
 * Middleware
 */

 //const bcrypt = require('bcrypt');
 const debug = require('debug')('albums:auth');
 const { User } = require('../models');
 
 /**
  * HTTP Basic Authentication
  */
 const basic = async (req, res, next) => {
     debug("Hello from auth.basic!");

     // make sure Authorization header exists, otherwise bail
     if (!req.headers.authorization) {
        debug("Authorization header missing");

        return res.status(401).send({
            status: 'fail',
            data: 'Authorization required',
        });
    }

    debug("Authorization header: %o", req.headers.authorization);

    const [authSchema, base64Payload] = req.headers.authorization.split(' ');

    if (authSchema.toLowerCase() !== "basic") {
        debug("Authorization schema isn't basic");
 
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization required',
         });
    }

    const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');
    
    
    const [email, password] = decodedPayload.split(':');


    const user = await new User({ email, password }).fetch({ require: false });
     if (!user) {
        return res.status(401).send({
            status: 'fail',
            data: 'Authorization failed',
        });
     }

     req.user = user;

     // pass request along
     next();
 }
 
 module.exports = {
     basic,
 }
 
 /*      
 
     const hash = user.get('password');
 
     // hash the incoming cleartext password using the salt from the db
     // and compare if the generated hash matches the db-hash
     const result = await bcrypt.compare(password, hash);
     if (!result) {
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization failed',
         });
     }
 
     // finally, attach user to request
     req.user = user;
      */