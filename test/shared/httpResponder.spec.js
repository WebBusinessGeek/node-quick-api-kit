var httpResponder = require("shared/httpResponder");
var assert = require("chai").assert;

describe("httpResponder", function() {
    describe("respond", function() {
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

});