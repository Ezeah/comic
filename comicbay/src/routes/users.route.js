const validateMiddleware = require('../middlewares/validate.middleware');
const handlerMiddleware = require('../middlewares/handler.middleware');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const validateObjectId = require('../models/user.model');
const admin = require('../middlewares/admin.middleware');
const validate = require('../models/user.model');
const express = require('express');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post( '/', validateMiddleware( validate ), handlerMiddleware( userController.register ) );

router.get( '/', authMiddleware(auth), handlerMiddleware( userController.getAllUsers ) );

router.get( '/username/:username', handlerMiddleware(userController.getUserByUsername ) );

router.get( '/:id', validateObjectId, handlerMiddleware( userController.getUserById ) );

router.put( '/:id', validateObjectId, auth, validateMiddleware( validate ), handlerMiddleware( userController.updateUserProfile) );

router.delete( '/:id', validateObjectId, auth, handlerMiddleware( userController.deleteUserAccount ) );

module.exports = router;


