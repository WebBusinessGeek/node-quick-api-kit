var app = require("express")();
var bodyParser = require("body-parser");
var httpResponses = require("constants/httpResponses");
var mongoose = require("mongoose");
var dbUri = require("private/databaseSecrets").databaseUri;
var httpResponder = require("shared/httpResponder");

mongoose.connect(dbUri);

exports.serverListeningMessage = "Server is listening on port: ";
exports.serverClosingMessage = "Server is closing on port: ";
exports.localBaseUrl = "http://localhost:";

var successStatus = exports.successfulResponseStatus = httpResponses.successfulResponseStatus;
var successGETStatusCode = exports.successOKStatusCode = httpResponses.successOKStatusCode;
var testRouteSuccessfulGETMessage = exports.successfulTestRouteGETResponseMessage = httpResponses.successfulTestRouteGETResponseMessage;
var successPOSTStatusCode = exports.successCREATEDStatusCode = httpResponses.successCREATEDStatusCode;
var testRouteSuccessfulPOSTMessage = exports.successfulTestRoutePOSTResponseMessage = httpResponses.successfulTestRoutePOSTResponseMessage;
var successPUTStatusCode = exports.successOKStatusCode = httpResponses.successOKStatusCode;
var testRouteSuccessfulPUTMessage = exports.successfulTestRoutePUTResponseMessage = httpResponses.successfulTestRoutePUTResponseMessage;
var successDELETEStatusCode = exports.successOKStatusCode = httpResponses.successOKStatusCode;
var testRouteSuccessfulDELETEMessage = exports.successfulTestRouteDELETEResponseMessage = httpResponses.successfulTestRouteDELETEResponseMessage;
var testRouteAuthNeededResponseMessage = exports.successfulTestRouteAuthNeededResponseMessage = httpResponses.successfulTestRouteAuthNeededResponseMessage;

exports.successfulAuthenticationMessage = httpResponses.successfulAuthenticationMessage;
exports.successfulRegisterMessage = httpResponses.successfulRegisterMessage;
exports.failureMissingEmailOrPasswordMessage = httpResponses.failureMissingEmailOrPasswordMessage;
exports.failureResponseStatus = httpResponses.failureResponseStatus;
exports.failureBadRequestStatusCode = httpResponses.failureBadRequestStatusCode;
exports.failureBadEmailFormatMessage = httpResponses.failureBadEmailFormatMessage;
exports.failureBadPasswordFormatMessage = httpResponses.failureBadPasswordFormatMessage;
exports.failureNoEmailProvidedMessage = httpResponses.failureNoEmailProvidedMessage;
exports.failureNoPasswordProvidedMessage = httpResponses.failureNoPasswordProvidedMessage;
exports.failureNoUserWithEmailMessage = httpResponses.failureNoUserWithEmailMessage;
exports.failurePasswordNotVerifiedMessage = httpResponses.failurePasswordNotVerifiedMessage;
exports.failureUnauthorizedStatusCode = httpResponses.failureUnauthorizedStatusCode;
exports.failureNoTokenProvidedMessage = httpResponses.failureNoTokenProvidedMessage;
exports.failureInvalidTokenMessage = httpResponses.failureInvalidTokenMessage;
exports.successfulDEAuthenticationMessage = httpResponses.successfulDEAuthenticationMessage;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


var userEndpoint = exports.usersEndpoint = "/users";
var userAuthRoutes = require("../resources/users/authRoutes");
//user authRoutes
app.use(userEndpoint, userAuthRoutes);


//Routes for testing
exports.testRoute = "/test-route";
exports.authNeededTestRoute = "/auth-needed-test-route";
app.get(this.testRoute, function(req, res) {
    return res.json(
        httpResponder.respondToOKRequest(testRouteSuccessfulGETMessage)
    );
});
app.post(this.testRoute, function(req, res) {
    return res.json(
        httpResponder.respondToCREATEDRequest(httpResponses.successfulTestRoutePOSTResponseMessage)
    );
});
app.put(this.testRoute, function(req, res) {
    return res.json(
        httpResponder.respondToOKRequest(httpResponses.successfulTestRoutePUTResponseMessage)
    );
});
app.delete(this.testRoute, function(req, res) {
    return res.json(
        httpResponder.respondToOKRequest(httpResponses.successfulTestRouteDELETEResponseMessage)
    );
});

var verifyTokenMiddleware = require("../middleware/verifyToken");
app.use("/", verifyTokenMiddleware);

app.post(this.authNeededTestRoute, function(req,res) {
    return res.json(
        httpResponder.respondToOKRequest(httpResponses.successfulTestRouteAuthNeededResponseMessage)
   );
});


var start = exports.start = function(port, callback) {
    var message = this.serverListeningMessage + port;
    server = app.listen(port, callback);
    console.log(message);
    return message;
};

var stop = exports.stop = function(port, callback) {
    var message = this.serverClosingMessage + port;
    server.close(callback);
    console.log(message);
    return message;
};


