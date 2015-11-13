var routeTester = require("testHelpers/routeTester");
var jwt = require("jsonwebtoken");
var tokenSecret = require("private/appSecrets").tokenSecret;
var RevokedToken = require("resources/revokedTokens/model");
var tokenOptions = require("constants/tokenOptions");
var mimic = require("testHelpers/mimic");


describe("VerifyToken Middleware", function() {
    before(function(done) {
        routeTester.forceNewPort();
        routeTester.startServer(done);
    });
    after(function(done) {
        routeTester.stopServer(done);
    });
    it("should return fail message if no token is provided", function(done) {
        routeTester.postRequest(routeTester.authMiddlewareTestingEndpoint, {email: null}).end(function(err, res) {
            routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
            routeTester.assert.equal(routeTester.failureUnauthorizedStatusCode, res.body.statusCode);
            routeTester.assert.equal(routeTester.failureNoTokenProvidedMessage, res.body.data.message);
            done();
        })
    });
    it("should return fail message if token is invalid", function(done) {
        this.timeout(20000);
        routeTester.postRequest(routeTester.authMiddlewareTestingEndpoint, {token: mimic.badJWTToken}).end(function(err, res) {
            routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
            routeTester.assert.equal(routeTester.failureUnauthorizedStatusCode, res.body.statusCode);
            routeTester.assert.equal(routeTester.failureInvalidTokenMessage, res.body.data.message);
            done();
        });
    });
    it("should check if token is revoked", function(done) {
        var payload = {
            random: Math.floor((Math.random() * 100) + 1)
        };
        var token =  jwt.sign(payload, tokenSecret, tokenOptions);
        var newRevokedToken = new RevokedToken({token: token});
        newRevokedToken.save(function(err) {
            if(!err) {
                routeTester.postRequest(routeTester.authMiddlewareTestingEndpoint, {token: token}).end(function(err, res) {
                    routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                    routeTester.assert.equal(routeTester.failureUnauthorizedStatusCode, res.body.statusCode);
                    routeTester.assert.equal(routeTester.failureInvalidTokenMessage, res.body.data.message);
                    done();
                })
            }
        });

    });
    it("should continue to correct route if token is valid", function(done) {
        var payload = {
            random: Math.floor((Math.random() * 100) + 1)
        };
        var token =  jwt.sign(payload, tokenSecret, tokenOptions);
        routeTester.postRequest(routeTester.authMiddlewareTestingEndpoint, {token: token}).end(function(err, res) {
            routeTester.assert.equal(routeTester.successfulResponseStatus, res.body.status);
            routeTester.assert.equal(routeTester.successOKStatusCode, res.body.statusCode);
            routeTester.assert.equal(routeTester.successfulTestRouteAuthNeededResponseMessage, res.body.data.message);
            done();
        })
    });
});