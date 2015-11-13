var app = require("bootstrap/app");
var request = require("superagent");
var assert = require("chai").assert;
var httpResponses = require("constants/httpResponses");

exports.assert = assert;
exports.testingPort = Math.floor((Math.random() * 3999) + 3000);
exports.serverListeningMessage = app.serverListeningMessage;
exports.serverClosingMessage = app.serverClosingMessage;
exports.testingEndpoint = app.testingEndpoint;
exports.authMiddlewareTestingEndpoint = app.authMiddlewareTestingEndpoint;
exports.fullTestingUrl = app.localBaseUrl + this.testingPort;

exports.usersEndpoint = app.usersEndpoint;


exports.successfulResponseStatus = httpResponses.successfulResponseStatus;
exports.failureResponseStatus = httpResponses.failureResponseStatus;


exports.successOKStatusCode = httpResponses.successOKStatusCode;
exports.successCREATEDStatusCode = httpResponses.successCREATEDStatusCode;
exports.failureBadRequestStatusCode = httpResponses.failureBadRequestStatusCode;
exports.failureUnauthorizedStatusCode = httpResponses.failureUnauthorizedStatusCode;


exports.successfulTestRouteGETResponseMessage = httpResponses.successfulTestRouteGETResponseMessage;
exports.successfulTestRoutePOSTResponseMessage = httpResponses.successfulTestRoutePOSTResponseMessage;
exports.successfulTestRoutePUTResponseMessage = httpResponses.successfulTestRoutePUTResponseMessage;
exports.successfulTestRouteDELETEResponseMessage = httpResponses.successfulTestRouteDELETEResponseMessage;
exports.successfulTestRouteAuthNeededResponseMessage = httpResponses.successfulTestRouteAuthNeededResponseMessage;


exports.successfulRegisterMessage = httpResponses.successfulRegisterMessage;
exports.failureMissingEmailOrPasswordMessage = httpResponses.failureMissingEmailOrPasswordMessage;
exports.failureBadEmailFormatMessage = httpResponses.failureBadEmailFormatMessage;
exports.failureBadPasswordFormatMessage = httpResponses.failureBadPasswordFormatMessage;
exports.failureNoEmailProvidedMessage = httpResponses.failureNoEmailProvidedMessage;
exports.failureNoPasswordProvidedMessage = httpResponses.failureNoPasswordProvidedMessage;
exports.failureNoUserWithEmailMessage = httpResponses.failureNoUserWithEmailMessage;
exports.failurePasswordNotVerifiedMessage = httpResponses.failurePasswordNotVerifiedMessage;
exports.successfulAuthenticationMessage = httpResponses.successfulAuthenticationMessage;
exports.failureNoTokenProvidedMessage = httpResponses.failureNoTokenProvidedMessage;
exports.failureInvalidTokenMessage = httpResponses.failureInvalidTokenMessage;
exports.successfulDEAuthenticationMessage = httpResponses.successfulDEAuthenticationMessage;

exports.startServer = function(callback) {
    return app.start(this.testingPort, callback);
};

exports.stopServer = function(callback) {
    return app.stop(this.testingPort, callback);
};

exports.forceNewPort = function() {
    this.testingPort = Math.floor((Math.random() * 3999) + 3000);
    this.fullTestingUrl = app.localBaseUrl + this.testingPort;
};

exports.getRequest = function(route) {
    return request.get(this.fullTestingUrl + route);
};

exports.postRequest = function(route, sendData) {
    return request.post(this.fullTestingUrl + route).send(sendData);
};

exports.putRequest = function(route, sendData) {
    return request.put(this.fullTestingUrl + route).send(sendData);
};

exports.deleteRequest = function(route) {
    return request.del(this.fullTestingUrl + route);
};

