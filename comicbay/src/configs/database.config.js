require('dotenv').config();
const mongoose = require('mongoose');

module.export = function() {
    const db = process.env.dburi;
    mongoose.connect(db)
    .then(() => console.info(`connected to database successfully...`));
    trycatch(() => console.log ('error connecting to database'));
}