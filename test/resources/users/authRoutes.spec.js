var routeTester = require("testHelpers/routeTester");
var User = require("resources/users/model");
var passwordHasher = require("password-hash");
var jwt = require("jsonwebtoken");
var tokenSecret = require("private/appSecrets").tokenSecret;
var RevokedToken = require("resources/revokedTokens/model");
var mimic = require("testHelpers/mimic");
var endpoints = require("constants/endpoints");
var tokenOptions = require("constants/tokenOptions");

describe("User AuthRoutes", function(){
    before(function(done){
        routeTester.startServer(done);
    });
    after(function(done) {
        routeTester.stopServer(done);
    });
    describe("POST /register", function() {
        it("should create and save new User when expected inputs are passed in", function(done) {
            var sendData = {
                email: mimic.mimicValidEmail(),
                password: mimic.mimicValidPassword()
            };
            routeTester.postRequest(routeTester.usersEndpoint + endpoints.registerEndpoint, sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.successfulResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.successCREATEDStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.successfulRegisterMessage, res.body.data.message);
                done();
            });
        });
        it("should return a failure when missing the email", function(done) {
            var sendData = {
                email: null,
                password: mimic.mimicValidPassword()
            };
            routeTester.postRequest(routeTester.usersEndpoint + endpoints.registerEndpoint, sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureBadRequestStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureMissingEmailOrPasswordMessage, res.body.data.message);
                done();
            });
        });
        it("should return a failure when missing the password", function(done) {
            var sendData = {
                email: mimic.mimicValidEmail(),
                password: null
            };
            routeTester.postRequest(routeTester.usersEndpoint + endpoints.registerEndpoint, sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureBadRequestStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureMissingEmailOrPasswordMessage, res.body.data.message);
                done();
            });
        });
        it("should return a failure if email is not in email format", function(done) {
            var sendData = {
                email: mimic.invalidEmail,
                password: mimic.mimicValidPassword()
            };
            routeTester.postRequest(routeTester.usersEndpoint + endpoints.registerEndpoint, sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureBadRequestStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureBadEmailFormatMessage, res.body.data.message);
                done();
            });
        });
        it("should return a failure if password is too short", function(done) {
            var sendData = {
                email: mimic.mimicValidEmail(),
                password: mimic.invalidPasswordShort
            };
            routeTester.postRequest(routeTester.usersEndpoint + endpoints.registerEndpoint, sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureBadRequestStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureBadPasswordFormatMessage, res.body.data.message);
                done();
            });
        });
        it("should return a failure if password contains not alphanumeric characters", function(done) {
            var sendData = {
                email: mimic.mimicValidEmail(),
                password: mimic.invalidPasswordBadChars
            };
            routeTester.postRequest(routeTester.usersEndpoint + endpoints.registerEndpoint, sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureBadRequestStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureBadPasswordFormatMessage, res.body.data.message);
                done();
            });
        })
    });

    describe("POST /authenticate", function() {
        it("should return a fail message if no email provided", function(done) {
            var testData = {
                email: null,
                password: mimic.mimicValidPassword()
            };
            routeTester.postRequest(routeTester.usersEndpoint + endpoints.authenticateEndpoint, testData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureBadRequestStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureNoEmailProvidedMessage, res.body.data.message);
                done();
            });
        });

        it("should return a fail message if no password provided", function(done) {
            var testData = {
                email: mimic.mimicValidEmail(),
                password: null
            };
            routeTester.postRequest(routeTester.usersEndpoint + endpoints.authenticateEndpoint, testData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureBadRequestStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureNoPasswordProvidedMessage, res.body.data.message);
                done();
            });
        });
        it("should return a fail message if user is not in database", function(done) {
            var testData = {
                email: mimic.mimicUniqueValidEmail(),
                password: mimic.mimicValidPassword()
            };
            routeTester.postRequest(routeTester.usersEndpoint + endpoints.authenticateEndpoint, testData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureBadRequestStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureNoUserWithEmailMessage, res.body.data.message);
                done();
            });
        });
        it("should return a fail message if passwords do not match", function(done) {
            var testUser = new User({
                email: mimic.mimicValidEmail(),
                password: mimic.mimicValidPassword()
            });
            testUser.save(function(err) {
                if(!err) {
                    routeTester.postRequest(routeTester.usersEndpoint + endpoints.authenticateEndpoint, {email: testUser.email, password: mimic.mimicValidPassword()}).end(function(err, res) {
                        routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                        routeTester.assert.equal(routeTester.failureBadRequestStatusCode, res.body.statusCode);
                        routeTester.assert.equal(routeTester.failurePasswordNotVerifiedMessage, res.body.data.message);
                        done();
                    });
                }
            });

        });
        it("should return a token if password do match", function(done) {
            var password = mimic.mimicValidPassword();
            var testUser = new User({
                email: mimic.mimicUniqueValidEmail(),
                password: passwordHasher.generate(password)
            });
            testUser.save(function(err) {
                if(!err) {
                    routeTester.postRequest(routeTester.usersEndpoint + endpoints.authenticateEndpoint, {email: testUser.email, password: password}).end(function(err, res) {
                        routeTester.assert.equal(routeTester.successfulResponseStatus, res.body.status);
                        routeTester.assert.equal(routeTester.successOKStatusCode, res.body.statusCode);
                        routeTester.assert.equal(routeTester.successfulAuthenticationMessage, res.body.data.message);
                        routeTester.assert.isString(res.body.data.token);
                        done();
                    });
                }
            });
        });
    });
    describe("GET /deauthenticate", function() {
        it("should return fail message if no token is sent", function(done) {
            routeTester.getRequest(routeTester.usersEndpoint + endpoints.DEauthenticateEndpoint).end(function(err,res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureUnauthorizedStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureNoTokenProvidedMessage, res.body.data.message);
                done();
            });
        });
        it("should successfully accept requests", function(done) {
            var payload = {
                random: Math.floor((Math.random() * 100) + 1)
            };
            var token =  jwt.sign(payload, tokenSecret, tokenOptions);
            routeTester.getRequest(routeTester.usersEndpoint + endpoints.DEauthenticateEndpoint + endpoints.tokenQuery + token).end(function(err,res) {
                routeTester.assert.equal(routeTester.successfulResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.successOKStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.successfulDEAuthenticationMessage, res.body.data.message);
                done();
            });
        });
        it("should create a new RevokedToken instance in db", function(done) {
            var payload = {
                random: Math.floor((Math.random() * 100) + 1)
            };
            var token =  jwt.sign(payload, tokenSecret, tokenOptions);
            routeTester.getRequest(routeTester.usersEndpoint + endpoints.DEauthenticateEndpoint + endpoints.tokenQuery + token).end(function(err) {
                if(!err) {
                    RevokedToken.findOne({token: token}, function(err, revokedToken) {
                        if(!err) {
                            routeTester.assert.equal(revokedToken.token, token);
                            done();
                        }
                    })
                }
            });
        });
        it("should return fail message if token is not valid", function(done) {
            var badToken = mimic.badJWTToken;
            routeTester.getRequest(routeTester.usersEndpoint + endpoints.DEauthenticateEndpoint + endpoints.tokenQuery + badToken).end(function(err,res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureUnauthorizedStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureInvalidTokenMessage, res.body.data.message);
                done();
            });
        });
    })
});