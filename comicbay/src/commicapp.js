const express = require('express');
const app = express();

require( './configs/route.config' )( app );
require( './configs/database.config' )();
require( './configs/validate.config' )();

const PORT = process.env.PORT || 8000;

const server = app.listen (port, () => {
    console.log(`app is listening on port ${PORT}...`)
});

module.exports = server;