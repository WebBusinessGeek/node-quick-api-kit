var httpResponder = require("shared/httpResponder");
var httpResponses = require("constants/httpResponses");
var assert = require("chai").assert;
var mimic = require("testHelpers/mimic");

describe("httpResponder", function() {
    describe("respond method", function() {
        it("should return a javascript object literal", function() {
            var result = httpResponder.respond();
            assert.isObject(result);
        });
        it("should take a status, statusCode, and message as arguments and return as object", function() {
            var status = httpResponses.successfulResponseStatus;
            var statusCode = httpResponses.successOKStatusCode;
            var message = mimic.randomString;

            var result = httpResponder.respond(status, statusCode, message);
            var correct = {
                status: httpResponses.successfulResponseStatus,
                statusCode: httpResponses.successOKStatusCode,
                data: {
                    message: mimic.randomString
                }
            };
            assert.deepEqual(result, correct);
        });
        it("should additionally take a object literal as the fourth parameter and merge it with the data object", function() {
            var status = httpResponses.successfulResponseStatus;
            var statusCode = httpResponses.successOKStatusCode;
            var message = mimic.randomString;

            var value1 = mimic.generateRandomString(), value2 = mimic.generateRandomString(), value3 = mimic.generateRandomString();

            var data = {
                property1: value1,
                property2: value2,
                property3: value3
            };
            var result = httpResponder.respond(status, statusCode, message, data);
            var correct = {
                status: httpResponses.successfulResponseStatus,
                statusCode: httpResponses.successOKStatusCode,
                data: {
                    message: mimic.randomString,
                    property1: value1,
                    property2: value2,
                    property3: value3
                }
            };
            assert.deepEqual(result, correct);
        })
    });
    describe("respondToFailedRequest method", function() {
        it("should return a hard coded failure status, flexible status code, and flexible data object with a message", function() {
            var message = mimic.randomString;
            
            var statusCode = httpResponses.successOKStatusCode;

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
            var message = mimic.randomString;

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
            var message = mimic.randomString;

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
    describe("respondToSuccessfulRequest", function() {
        it("should return a hard coded success status, flexible statusCode, and flexible data object with a message", function() {
            var message = mimic.randomString;

            var statusCode = httpResponses.successOKStatusCode;

            var status = httpResponses.successfulResponseStatus;

            var result = httpResponder.respondToSuccessfulRequest(statusCode, message);
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
    describe("respondToOKRequest", function() {
        it("should return a hard coded success status, hard coded OK statusCode, and flexible data object", function() {
            var message = mimic.randomString;

            var status = httpResponses.successfulResponseStatus;
            var statusCode = httpResponses.successOKStatusCode;

            var result = httpResponder.respondToOKRequest(message);
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
    describe("respondToCreatedRequest", function() {
        it("should return a hard coded success status, hard coded CREATED statusCode, and flexible data object", function() {
            var message = mimic.randomString;

            var status = httpResponses.successfulResponseStatus;
            var statusCode = httpResponses.successCREATEDStatusCode;

            var result = httpResponder.respondToCREATEDRequest(message);
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

});