const validateMiddleware = require('../middlewares/validate.middleware');
const authController = require('../controllers/auth.controller');
const express = require('express');
const { validite } = require('../models/user.model');
const router = express.Router();
const joi = require(joi);

router.post( '/', validateMiddleware( validite ), authController.login );
function validite(req) {
    const schema = joi.object( { password: joi.string().min(8).max(50).required(), 
    email: joi.string().min(5).max(50).required(), } );
    return schema.validate(req);
}

module.exports = router;