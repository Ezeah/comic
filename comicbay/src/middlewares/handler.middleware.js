const { MESSAGES } = require('../utils/constants.utils');

module.exports = (handler) => {
    return async ( req, res, next ) => {
        try { await handler ( req, res ); }
        catch(ex) { res.send( { message: ex.message || MESSAGES.ERROR, success: false } ); next(ex) }
    };
};