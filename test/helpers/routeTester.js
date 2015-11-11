var app = require("bootstrap/app");
var request = require("superagent");
var assert = require("chai").assert;

exports.assert = assert;
exports.testingPort = Math.floor((Math.random() * 3999) + 3000);
exports.serverListeningMessage = app.serverListeningMessage;
exports.serverClosingMessage = app.serverClosingMessage;
exports.testRoute = app.testRoute;
exports.authNeededTestRoute = app.authNeededTestRoute;
exports.fullTestingUrl = app.localBaseUrl + this.testingPort;
exports.successfulResponseStatus = app.successfulResponseStatus;
exports.successOKStatusCode = app.successOKStatusCode;
exports.successfulTestRouteGETResponseMessage = app.successfulTestRouteGETResponseMessage;
exports.successCREATEDStatusCode = app.successCREATEDStatusCode;
exports.successfulTestRoutePOSTResponseMessage = app.successfulTestRoutePOSTResponseMessage;
exports.successOKStatusCode = app.successOKStatusCode;
exports.successfulTestRoutePUTResponseMessage = app.successfulTestRoutePUTResponseMessage;
exports.successOKStatusCode = app.successOKStatusCode;
exports.failureBadRequestStatusCode = app.failureBadRequestStatusCode;
exports.failureUnauthorizedStatusCode = app.failureUnauthorizedStatusCode;
exports.successfulTestRouteDELETEResponseMessage = app.successfulTestRouteDELETEResponseMessage;
exports.usersEndpoint = app.usersEndpoint;
exports.successfulRegisterMessage = app.successfulRegisterMessage;
exports.failureResponseStatus = app.failureResponseStatus;
exports.failureMissingEmailOrPasswordMessage = app.failureMissingEmailOrPasswordMessage;
exports.failureBadEmailFormatMessage = app.failureBadEmailFormatMessage;
exports.failureBadPasswordFormatMessage = app.failureBadPasswordFormatMessage;
exports.failureNoEmailProvidedMessage = app.failureNoEmailProvidedMessage;
exports.failureNoPasswordProvidedMessage = app.failureNoPasswordProvidedMessage;
exports.failureNoUserWithEmailMessage = app.failureNoUserWithEmailMessage;
exports.failurePasswordNotVerifiedMessage = app.failurePasswordNotVerifiedMessage;
exports.successfulAuthenticationMessage = app.successfulAuthenticationMessage;
exports.successfulTestRouteAuthNeededResponseMessage = app.successfulTestRouteAuthNeededResponseMessage;
exports.failureNoTokenProvidedMessage = app.failureNoTokenProvidedMessage;
exports.failureInvalidTokenMessage = app.failureInvalidTokenMessage;
exports.successfulDEAuthenticationMessage = app.successfulDEAuthenticationMessage;

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

