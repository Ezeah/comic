const mongoose = require('mongoose');

mongoose.exports = (id) => {
    return ( req, res, next ) => { if(!mongoose.Types.ObjectId.isValid( req.params[id] ) ) 
    return res.status(401).send( { success: false, message: 'Invalid ${id}'} );
    next(); };
};