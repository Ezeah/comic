const constants = {
    DATABASE_URI: process.env.DATABASE_URI,
    
    DATABASES: {
        COMIC_BOOKS: "COMIC_BOOKS",
        USER: "user",
    },
    USER_TYPES: {
        USER: "user",
        ADMIN: "admin",
    },
    MESSAGES: {
        FETCHED: "Resource fetched successfully",
        UPDATED: "Resource updated successfully",
        DELETED: "Resource deleted successfully",
        CREATED: "Resource created successfully",
        ERROR:   "Resource error",
        UNAUTHORIZED(use) {
            return `You cannot ${use} a resourse created by another user`;
        },
        NOT_FOUND(resource, resourseId) {
            return `${Resourse} can't be found with the provided ${resourseId} ID`;
        },
        SUCCESSFUL_SIGNIN: "Signin successful ",
        SIGNIN_FAILURE: " Unable to login. Username or password is incorrect.",    
   },
   errorMessage(data) {
    return { message: this.MESSAGES.NOT_FOUND, success: false, data };
   }
 };
 
 module.exports = constants; 