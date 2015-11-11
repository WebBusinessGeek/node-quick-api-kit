var app = require("../../app/bootstrap/app");
var request = require("superagent");
var assert = require("chai").assert;

exports.assert = assert;
exports.testingPort = Math.floor((Math.random() * 3999) + 3000);
exports.serverListeningMessage = app.serverListeningMessage;
exports.serverClosingMessage = app.serverClosingMessage;
exports.testRoute = app.testRoute;
exports.authNeededTestRoute = app.authNeededTestRoute;
exports.fullTestingUrl = app.baseUrl + this.testingPort;
exports.successfulResponseStatus = app.successfulResponseStatus;
exports.successfulGETResponseStatusCode = app.successfulGETResponseStatusCode;
exports.successfulTestRouteGETResponseMessage = app.successfulTestRouteGETResponseMessage;
exports.successfulPOSTResponseStatusCode = app.successfulPOSTResponseStatusCode;
exports.successfulTestRoutePOSTResponseMessage = app.successfulTestRoutePOSTResponseMessage;
exports.successfulPUTResponseStatusCode = app.successfulPUTResponseStatusCode;
exports.successfulTestRoutePUTResponseMessage = app.successfulTestRoutePUTResponseMessage;
exports.successfulDELETEResponseStatusCode = app.successfulDELETEResponseStatusCode;
exports.failurePOSTResponseStatusCode = app.failurePOSTResponseStatusCode;
exports.failureUnauthorizedResponseStatusCode = app.failureUnauthorizedResponseStatusCode;
exports.successfulTestRouteDELETEResponseMessage = app.successfulTestRouteDELETEResponseMessage;
exports.usersEndpoint = app.usersEndpoint;
exports.successfulRegisterMessage = app.successfulRegisterMessage;
exports.failureResponseStatus = app.failureResponseStatus;
exports.failureRegisterMessage = app.failureRegisterMessage;
exports.failureBadEmailFormatMessage = app.failureBadEmailFormatMessage;
exports.failureBadPasswordFormatMessage = app.failureBadPasswordFormatMessage;
exports.failureNoEmailProvidedMessage = app.failureNoEmailProvidedMessage;
exports.failureNoPasswordProvidedMessage = app.failureNoPasswordProvidedMessage;
exports.failureNoUserByIdentifierMessage = app.failureNoUserByIdentifierMessage;
exports.failureInvalidPasswordMessage = app.failureInvalidPasswordMessage;
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
    this.fullTestingUrl = app.baseUrl + this.testingPort;
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

