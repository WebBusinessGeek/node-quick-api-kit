var routeTester = require("testHelpers/routeTester");
var assert = require("chai").assert;

describe("routeTester", function() {
    describe("testingPort", function() {
        it("should export a testingPort integer variable", function() {
            var value = routeTester.testingPort;
            assert.isNumber(value);
        });
    });
    describe("serverListeningMessage", function() {
        it("should export a serverListeningMessage variable", function() {
            var value = routeTester.serverListeningMessage;
            assert.isString(value);
        });
    });
    describe("serverClosingMessage", function() {
        it("should export a serverClosingMessage variable", function() {
            var value = routeTester.serverClosingMessage;
            assert.isString(value);
        });
    });
    describe("testingEndpoint", function() {
        it("should export a testingEndpoint variable", function() {
            var value = routeTester.testingEndpoint;
            assert.isString(value);
        });
    });
    describe("startServer", function() {
        it("should export a startServer method", function() {
            var value =  routeTester.startServer;
            assert.isFunction(value);
        });
        it("should return correct listening message ", function() {
            var value = routeTester.startServer();
            correct = routeTester.serverListeningMessage + routeTester.testingPort;
            assert.equal(value, correct);
        });
    });
    describe("stopServer", function() {
        it("should export a stopServer method", function() {
            var value = routeTester.stopServer;
            assert.isFunction(value);
        });
        it("should return correct closing message", function() {
            var value = routeTester.stopServer();
            correct = routeTester.serverClosingMessage + routeTester.testingPort;
            assert.equal(value, correct);
        })
    });
    describe("Route Related Methods", function() {
        before(function(done) {
            routeTester.forceNewPort();
            routeTester.startServer(done);
        });
        after(function(done) {
            routeTester.stopServer(done);
        });
        describe("getRequest", function() {
            it("should export a getRequest method", function() {
                var value = routeTester.getRequest;
                assert.isFunction(value);
            });
            it("should successfully make a GET request", function(done) {
                routeTester.getRequest(routeTester.testingEndpoint).end(function(err, res) {
                    assert.equal(res.body.status, routeTester.successfulResponseStatus);
                    assert.equal(res.body.statusCode, routeTester.successOKStatusCode);
                    assert.equal(res.body.data.message, routeTester.successfulTestRouteGETResponseMessage);
                    done();
                });

            });
        });
        describe("postRequest", function() {
            it("should export a postRequest method", function() {
                var value = routeTester.postRequest;
                assert.isFunction(value);
            });
            it("should successfully make a POST request", function(done) {
                routeTester.postRequest(routeTester.testingEndpoint).end(function(err, res) {
                    assert.equal(res.body.status, routeTester.successfulResponseStatus);
                    assert.equal(res.body.statusCode, routeTester.successCREATEDStatusCode);
                    assert.equal(res.body.data.message, routeTester.successfulTestRoutePOSTResponseMessage);
                    done();
                })
            });
        });
        describe("putRequest", function() {
            it("should export a putRequest method", function() {
                var value = routeTester.putRequest;
                assert.isFunction(value);
            });
            it("should successfully make a PUT request", function(done) {
                var dataToPut = {
                    data : "data"
                };
                routeTester.putRequest(routeTester.testingEndpoint, dataToPut).end(function(err, res) {
                    assert.equal(res.body.status, routeTester.successfulResponseStatus);
                    assert.equal(res.body.statusCode, routeTester.successOKStatusCode);
                    assert.equal(res.body.data.message, routeTester.successfulTestRoutePUTResponseMessage);
                    done();
                })
            })
        });
        describe("deleteRequest", function() {
            it("should export a deleteRequest method", function() {
                var value = routeTester.deleteRequest;
                assert.isFunction(value);
            });
            it("should successfully make a DELETE request", function(done) {
                routeTester.deleteRequest(routeTester.testingEndpoint).end(function(err, res) {
                    assert.equal(res.body.status, routeTester.successfulResponseStatus);
                    assert.equal(res.body.statusCode, routeTester.successOKStatusCode);
                    assert.equal(res.body.data.message, routeTester.successfulTestRouteDELETEResponseMessage);
                    done();
                });
            })
        })
    })

});