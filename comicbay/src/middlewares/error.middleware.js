module.exports = ( err, req, res, next ) => {
    res.status(500).send( { success: false, message: 'something failed' } ); 
};