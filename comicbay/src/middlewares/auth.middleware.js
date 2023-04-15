const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = ( req, res, next ) => {
    const token = req.header( ' x-auth-token' );
    if( !token ) return res.status(401).send( { success: false, message: 'Access denied' } );
    try { const decoded = jwt.verify( token, process.env.jwtPrivateKey );
        req.user = decoded;
        next(); 
    } catch (ex) { res.status(400).send( { success: false, message: 'Invalid token' } ); }
};