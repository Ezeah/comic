const error = require('../middlewares/error.middleware');
const users = require('../routes/users.route');
const auth = require('../routes/auth.route');
const express = require('express');
// const redirect = require('../routes/redirect.route');

module.exports = ( app ) => { app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );

app.use( '/api/v1/users', users );
app.use( '/api/v1/auth', auth );
// app.use( '/api/v1/redirect', redirect );
app.use( error );
};