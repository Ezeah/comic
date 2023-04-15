const mongoose = require('mongoose');
const jwt = requre('jsonwebtoken');
const joi = require('joi');
require('dotenv').config();

const userSchema = new mongoose.schema ({
    name: { type: String, minlenght: 2, maxlenght: 50, trim: true, required: true, unique: true },
    password: { type: String, minlenght: 8, maxlenght: 50, trim: true, required: true, unique: true },
    email: { type: String, minlenght:4, maxlenght: 50, trim: true, required: true, unique: true },
    isAdmin: Boolean,
    isDeleted: Boolean,
    avatarUrl: { type: String, required: true },
    avatarImagTag: { type: String, required: true },
    username: { type: string, required: true},
});

userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign( { _id: this._id, isAdmin, name: this.name }, process.env.jwtPrivateKey );
    return token;
};

const user = mongoose.model ('user', userSchema);
 function validite(user) {
    const schema = joi.object({
        name: joi.string.min(2).max(50), 
        password: joi.string.min(8).max(50), 
        email: joi.string().email().min(5).max(50),
    });
    return schema.validite(user);
}

exports.validite = validate;
exports.user = user;