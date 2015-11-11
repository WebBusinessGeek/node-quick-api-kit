var app = require("express")();
var bodyParser = require("body-parser");
var httpResponses = require("../constants/httpResponses");
var mongoose = require("mongoose");
var dbUri = require("../private/databaseSecrets").databaseUri;

mongoose.connect(dbUri);

exports.serverListeningMessage = "Server is listening on port: ";
exports.serverClosingMessage = "Server is closing on port: ";
exports.localBaseUrl = "http://localhost:";

var successStatus = exports.successfulResponseStatus = httpResponses.successfulResponseStatus;
var successGETStatusCode = exports.successfulGETResponseStatusCode = httpResponses.successfulGETResponseStatusCode;
var testRouteSuccessfulGETMessage = exports.successfulTestRouteGETResponseMessage = httpResponses.successfulTestRouteGETResponseMessage;
var successPOSTStatusCode = exports.successfulPOSTResponseStatusCode = httpResponses.successfulPOSTResponseStatusCode;
var testRouteSuccessfulPOSTMessage = exports.successfulTestRoutePOSTResponseMessage = httpResponses.successfulTestRoutePOSTResponseMessage;
var successPUTStatusCode = exports.successfulPUTResponseStatusCode = httpResponses.successfulPUTResponseStatusCode;
var testRouteSuccessfulPUTMessage = exports.successfulTestRoutePUTResponseMessage = httpResponses.successfulTestRoutePUTResponseMessage;
var successDELETEStatusCode = exports.successfulDELETEResponseStatusCode = httpResponses.successfulDELETEResponseStatusCode;
var testRouteSuccessfulDELETEMessage = exports.successfulTestRouteDELETEResponseMessage = httpResponses.successfulTestRouteDELETEResponseMessage;
var testRouteAuthNeededResponseMessage = exports.successfulTestRouteAuthNeededResponseMessage = httpResponses.successfulTestRouteAuthNeededResponseMessage;

exports.successfulAuthenticationMessage = httpResponses.successfulAuthenticationMessage;
exports.successfulRegisterMessage = httpResponses.successfulRegisterMessage;
exports.failureRegisterMessage = httpResponses.failureRegisterMessage;
exports.failureResponseStatus = httpResponses.failureResponseStatus;
exports.failurePOSTResponseStatusCode = httpResponses.failurePOSTResponseStatusCode;
exports.failureBadEmailFormatMessage = httpResponses.failureBadEmailFormatMessage;
exports.failureBadPasswordFormatMessage = httpResponses.failureBadPasswordFormatMessage;
exports.failureNoEmailProvidedMessage = httpResponses.failureNoEmailProvidedMessage;
exports.failureNoPasswordProvidedMessage = httpResponses.failureNoPasswordProvidedMessage;
exports.failureNoUserByIdentifierMessage = httpResponses.failureNoUserByIdentifierMessage;
exports.failureInvalidPasswordMessage = httpResponses.failureInvalidPasswordMessage;
exports.failureUnauthorizedResponseStatusCode = httpResponses.failureUnauthorizedResponseStatusCode;
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
    return res.json({
        status : successStatus,
        statusCode : successGETStatusCode,
        data: {
            message: testRouteSuccessfulGETMessage
        }
    });
});
app.post(this.testRoute, function(req, res) {
    return res.json({
        status: successStatus,
        statusCode: successPOSTStatusCode,
        data: {
            message: testRouteSuccessfulPOSTMessage
        }
    });
});
app.put(this.testRoute, function(req, res) {
    return res.json({
        status: successStatus,
        statusCode: successPUTStatusCode,
        data: {
            message: testRouteSuccessfulPUTMessage
        }
    })
});
app.delete(this.testRoute, function(req, res) {
    return res.json({
        status: successStatus,
        statusCode: successDELETEStatusCode,
        data: {
            message: testRouteSuccessfulDELETEMessage
        }
    });
});

var verifyTokenMiddleware = require("../middleware/verifyToken");
app.use("/", verifyTokenMiddleware);

app.post(this.authNeededTestRoute, function(req,res) {
    return res.json({
        status: successStatus,
        statusCode: successGETStatusCode,
        data: {
            message: testRouteAuthNeededResponseMessage
        }
    });
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


