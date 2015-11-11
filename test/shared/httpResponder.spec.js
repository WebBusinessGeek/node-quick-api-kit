var httpResponder = require("shared/httpResponder");
var httpResponses = require("constants/httpResponses");
var assert = require("chai").assert;

describe("httpResponder", function() {
    describe("respond method", function() {
        it("should return a javascript object literal", function() {
            var result = httpResponder.respond();
            assert.isObject(result);
        });
        it("should take a status, statusCode, and message as arguments and return as object", function() {
            var status = "status";
            var statusCode = 100;
            var message = "someMessage";

            var result = httpResponder.respond(status, statusCode, message);
            var correct = {
                status: "status",
                statusCode: 100,
                data: {
                    message: "someMessage"
                }
            };
            assert.deepEqual(result, correct);
        });
        it("should additionally take a object literal as the fourth parameter and merge it with the data object", function() {
            var status = "status";
            var statusCode = 100;
            var message = "someMessage";
            var data = {
                property1: "value",
                property2: "value2",
                property3: "value3"
            };
            var result = httpResponder.respond(status, statusCode, message, data);
            var correct = {
                status: "status",
                statusCode: 100,
                data: {
                    message: "someMessage",
                    property1: "value",
                    property2: "value2",
                    property3: "value3"
                }
            };
            assert.deepEqual(result, correct);
        })
    });
    describe("respondToFailedRequest method", function() {
        it("should return a hard coded failure status, flexible status code, and flexible data object with a message", function() {
            var message = "message will be here";
            var statusCode = "status will go here";

            var status = httpResponses.failureResponseStatus;

            var result = httpResponder.respondToFailedRequest(statusCode, message);
            var expected = {
                status: status,
                statusCode: statusCode,
                data: {
                    message: message
                }
            };
            assert.deepEqual(result, expected);
        })
    });
    describe("respondToBadRequest method", function() {
        it("should return a hard coded failure status, bad request code, and flexible data object with a message", function() {
            var message = "message will be here";


            var status = httpResponses.failureResponseStatus;
            var statusCode = httpResponses.failureBadRequestStatusCode;

            var result = httpResponder.respondToBadRequest(message);
            var expected = {
                status: status,
                statusCode: statusCode,
                data: {
                    message: message
                }
            };
            assert.deepEqual(result, expected);

        })
    });
    describe("respondToUnauthorizedRequest method", function() {
        it("should return a hard coded failure status, Unauthorized code, and flexible data object with a message", function() {
            var message = "message will be here";


            var status = httpResponses.failureResponseStatus;
            var statusCode = httpResponses.failureUnauthorizedStatusCode;

            var result = httpResponder.respondToUnauthorizedRequest(message);
            var expected = {
                status: status,
                statusCode: statusCode,
                data: {
                    message: message
                }
            };
            assert.deepEqual(result, expected);
        })
    });
    describe("respondToSuccessRequest", function() {

    });
    describe("respondToOKRequest", function() {

    });
    describe("respondToCreatedRequest", function() {

    });

});