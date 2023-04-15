const { MESSAGES } = require('./constants.utils');

const successMessage = ( message, data ) => {
    return { message, success: true, data };
};

const errorMessage = ( data, resourse, resourseId = resourse ) => {
    return { message: MESSAGES.NOT_FOUND(resourse, resourseId), success: false, data }; 
};

const signinSuccess = ( data ) => {
    return { message: MESSAGES.SUCCESSFUL_SIGNIN, success: true, data };
};

const unAuthMessage = ( message ) => {
    return { message, success: false };
};

const signinError = () => {
    return { message: MESSAGES.SIGNIN_FAILURE, success: false };
};

exports.successMessage = successMessage;
exports.errorMessage = errorMessage;
exports.signinSuccess = signinSuccess;
exports.unAuthMessage = unAuthMessage;
exports.signinError = signinError;

