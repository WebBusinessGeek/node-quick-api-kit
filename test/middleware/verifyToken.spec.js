var routeTester = require("../helpers/routeTester");
var jwt = require("jsonwebtoken");
var tokenSecret = require("../../app/private/appSecrets").tokenSecret;
var RevokedToken = require("../../app/resources/revokedTokens/model");


describe("VerifyToken Middleware", function() {
    before(function(done) {
        routeTester.forceNewPort();
        routeTester.startServer(done);
    });
    after(function(done) {
        routeTester.stopServer(done);
    });
    it("should return fail message if no token is provided", function(done) {
        routeTester.postRequest(routeTester.authNeededTestRoute, {email: null}).end(function(err, res) {
            routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
            routeTester.assert.equal(routeTester.failureUnauthorizedResponseStatusCode, res.body.statusCode);
            routeTester.assert.equal(routeTester.failureNoTokenProvidedMessage, res.body.data.message);
            done();
        })
    });
    it("should return fail message if token is invalid", function(done) {
        routeTester.postRequest(routeTester.authNeededTestRoute, {token: "badToken"}).end(function(err, res) {
            routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
            routeTester.assert.equal(routeTester.failureUnauthorizedResponseStatusCode, res.body.statusCode);
            routeTester.assert.equal(routeTester.failureInvalidTokenMessage, res.body.data.message);
            done();
        });
    });
    it("should check if token is revoked", function(done) {
        var payload = {

        };
        var options = {
            expiresIn: "2h",
            issuer: "test"
        };
        var token =  jwt.sign(payload, tokenSecret, options);
        var newRevokedToken = new RevokedToken({token: token});
        newRevokedToken.save(function(err) {
            if(!err) {
                routeTester.postRequest(routeTester.authNeededTestRoute, {token: token}).end(function(err, res) {
                    routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                    routeTester.assert.equal(routeTester.failureUnauthorizedResponseStatusCode, res.body.statusCode);
                    routeTester.assert.equal(routeTester.failureInvalidTokenMessage, res.body.data.message);
                    done();
                })
            }
        });

    });
    it("should continue to correct route if token is valid", function(done) {
        var payload = {

        };
        var options = {
            expiresIn: "2h",
            issuer: "tester"
        };
        var token =  jwt.sign(payload, tokenSecret, options);
        routeTester.postRequest(routeTester.authNeededTestRoute, {token: token}).end(function(err, res) {
            routeTester.assert.equal(routeTester.successfulResponseStatus, res.body.status);
            routeTester.assert.equal(routeTester.successfulGETResponseStatusCode, res.body.statusCode);
            routeTester.assert.equal(routeTester.successfulTestRouteAuthNeededResponseMessage, res.body.data.message);
            done();
        })
    });
});