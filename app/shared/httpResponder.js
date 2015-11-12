var httpResponses = require("constants/httpResponses");

exports.respond = function(status, statusCode, message, data) {
    var dataObject = {message: message};
    if(data){
        var properties = Object.keys(data);
        for(var i = 0; i < properties.length; i++) {
            dataObject[properties[i]] = data[properties[i]];
        }
    }
    return {
        status: status,
        statusCode: statusCode,
        data: dataObject
    };
};

exports.respondToFailedRequest = function(statusCode, message, data) {
    return this.respond(httpResponses.failureResponseStatus, statusCode, message, data);
};
exports.respondToBadRequest = function(message, data) {
    return this.respondToFailedRequest(httpResponses.failureBadRequestStatusCode, message, data);
};
exports.respondToUnauthorizedRequest = function(message, data) {
    return this.respondToFailedRequest(httpResponses.failureUnauthorizedStatusCode, message, data);
};
exports.respondToSuccessfulRequest = function(statusCode, message, data) {
    return this.respond(httpResponses.successfulResponseStatus, statusCode, message, data);
};
exports.respondToOKRequest = function(message, data) {
    return this.respondToSuccessfulRequest(httpResponses.successOKStatusCode, message, data);
};
exports.respondToCREATEDRequest = function(message, data) {
    return this.respondToSuccessfulRequest(httpResponses.successCREATEDStatusCode, message, data);
};

