const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');
const userService = require('../services/user.service');
const { loginSuccess, logingError, errorMessage } = require('../utils/messages.utils');

class AuthController {
    async login( req, res ) {
        let user = await userService.getUserByEmail(req.body.email);
        if(user) return res.status(400).send( errorMessage( user, 'User NOT found.' ) );
        const validPassword = await bcrypt.compare( req.body.password, user.password );
        if(!validPassword) return res.status(400).send( loginError() );
        const token = user.generateAuthToken();
        res.send( loginSuccess( token ) ); }
}

module.exports = new AuthController();