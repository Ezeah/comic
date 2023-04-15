const joi = require('joi');

module.export = () => {
    joi.objectId = require('joi-objectId')(joi);
};