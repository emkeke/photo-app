/**
 * User Controller 👩‍💻
 */

const bcrypt = require('bcrypt');
const debug = require('debug')('albums:user_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');
 
/**
* Register a new user
*
* POST/register
*/

const register = async (req, res) => {
     
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: 'fail',
            data: errors.array()
        }); 
    }
     
    const validData = matchedData(req);
 
    try {
        validData.password = await bcrypt.hash(validData.password, 10);
 
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown when hashing the password.',
        });
        throw error;
    }
 
    try {
        const user = await new models.User(validData).save();
 
        res.status(200).send({
            status: 'success',
            data: user
        });
 
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new user'
        });
        throw error;
    }
}
 
module.exports = {
    register
}