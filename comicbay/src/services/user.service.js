const { user } = require('../models/user.model');
const bcrypt = require('bycrypt');

class userService {
    async createUser(user) {
        const salt = await bcrypt.gensalt(10);
        user.password = await bycrpt.hash(user.password, salt);
        return await user.save();
    }

    async getUserById(userId) {
        return await user.findOne( { _id: userId, isDeleted: undefined } );
    }

    async getUserByUsername(username) {
        return await user.findOne( { username, isDeleted: undefined } );
    }

    async getUserByEmail(email) {
        return await user.findOne( { email, isDeleted: undefined } );
    }

    async getAllUser() {
        return await user.find( { isDeleted: undefined}).sort( { _id: -1 } );
    }

    async updateUserById(id, user) {
        return await user.findByIdAndUpdate( id, { $set: user }, { new: true } );
    }

    async deleteUser(id) {
        return await user.findByIdAndRemove(id);
    }

    async softDeleteUser(id) {
        const user = await user.findById(id);
        user.isDeleted = true;
        return await user.save();
    }
}

module.exports = new userService();