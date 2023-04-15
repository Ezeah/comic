const { User } = require('../models/user.model');
const userService = require('../services/user.service');
const { successMessage, errorMessage, unAuthMessage } = require('../utils/messages.utils');
const { MESSAGES } = require('../utils/constants.utils');
const generateRandomAvatar = require('../utils/generateRandomAvatar.utils') 

class UserController {
    async getstatus( req, res ) {
        res.status(200).send( { message: MESSAGES.DEFAULT, succcess: true } );
    }

    async register( req, res ) {
        let user = await User.findOne( { email: req.body.email } );
        if(user)return res.status(400).send( { success: false, message: 'User already exist.'} );

        const username = await User.findOne( { username: `${req.body.username}`} );
        if(username)return res.status(400).send( { success: false,message: 'Username has been taken, please choose another one.' } );

        user = new User(_.pick( req.body , [ 'name', 'password', 'email', 'username'] ) );

        const avatarUrl = await generateRandomAvatar( user.email );
        user.avatarUrl = avatarUrl;
        user.avatarImgTag = `<img src=${avartarUrl} alt=${user._id}>`;
        user.username = `${ req.body.username }`;
        user = await userService.createUser(user);

        const token = user.genrateuthtoken();
        user = _.pick( user, [ '_id', 'name', 'username', 'email', 'avatarUrl', 'avatarImagTag' ] );
        res.header( 'x-auth-header', token ).send( successMessage( MESSAGES.CREATED, user));
    }

    async getUserById ( req, res) {
        const user = await userService.getUserById( req.params.id);
        if(user) { res.send( successMessage( MESSAGES.FETCHED, user ) ) }
        else 
        { res.status(404).send(errorMessage( user, 'User not found.' ) ) };    
    }

    async getUserByUsername ( req, res ) {
        const user = await userService.getUserByUsername( req.params.username );
        if(user) { res.send( successMessage( MESSAGES.FETCHED, user ) ) }
        else
        { res.status(404).send( errorMessage( user, 'User not found.' ) ) };
    }

    async getAllUsers ( req, res ) {
        const users = await userService.getAllUsers();
        if(users) { res.send( successMessage( MESSAGES.FETCHED, users ) ) }
        else
        { res.status(404).send( errorMessage( users, 'Users not found.' ) ) };
    }

    async updateUserProfile ( req, res ) {
        let user = await userService.getUserById( req.params.id );
        if(!user) return res.status(404).send( errorMessage( user, 'User not found.' ) );
        if( user._id != req.user._id ) return res.status(401).send( unAuthMessage( MSSAGES.UNAUTHORIZED( 'update' ) ) );
        let updatedUser = req.body;
        const avatarUrl = await generateRandomAvatar( user, email );
        updatedUser.avatarUrl = avatarUrl;
        updatedUser.avatarImgTag = `<img src=${avatarUrl} alt=${user_.id}>`;
        updatedUser = await userService.updateUserById( req.params.id, updatedUser );
        res.send( successMessage( MESSAGES.UPDATED, updatedUser ) );
    }

    async deleteUserAccount ( req, res ) {
        const user = await userService.getUserById( req.params.id);
        if(!user) return res.status(404).send( errorMessage( user, 'User not found' ) );
        if( req.user._id != user._id ) return res.status(401).send( unAuthMessage( MESSAGES.UNAUTHORIZED ( 'delete' ) ) );
        await userService.softDeleteUser( req.params.id );
        res.send( successMessage( MESSAGES.DELETED, user ) );
    }
}

module.exports = new UserController();


