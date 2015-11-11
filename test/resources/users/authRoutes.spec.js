var routeTester = require("testHelpers/routeTester");
var User = require("resources/users/model");
var passwordHasher = require("password-hash");
var jwt = require("jsonwebtoken");
var tokenSecret = require("private/appSecrets").tokenSecret;
var RevokedToken = require("resources/revokedTokens/model");

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
                email: "someEmail@email.com",
                password: "password"
            };
            routeTester.postRequest(routeTester.usersEndpoint + "/register", sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.successfulResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.successfulPOSTResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.successfulRegisterMessage, res.body.data.message);
                done();
            });
        });
        it("should return a failure when missing the email", function(done) {
            var sendData = {
                email: null,
                password: "password"
            };
            routeTester.postRequest(routeTester.usersEndpoint + "/register", sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failurePOSTResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureRegisterMessage, res.body.data.message);
                done();
            });
        });
        it("should return a failure when missing the password", function(done) {
            var sendData = {
                email: "someEmail@email.com",
                password: null
            };
            routeTester.postRequest(routeTester.usersEndpoint + "/register", sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failurePOSTResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureRegisterMessage, res.body.data.message);
                done();
            });
        });
        it("should return a failure if email is not in email format", function(done) {
            var sendData = {
                email: "bad@bad",
                password: "password"
            };
            routeTester.postRequest(routeTester.usersEndpoint + "/register", sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failurePOSTResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureBadEmailFormatMessage, res.body.data.message);
                done();
            });
        });
        it("should return a failure if password is too short", function(done) {
            var sendData = {
                email: "email@email.com",
                password: "bad"
            };
            routeTester.postRequest(routeTester.usersEndpoint + "/register", sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failurePOSTResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureBadPasswordFormatMessage, res.body.data.message);
                done();
            });
        });
        it("should return a failure if password contains not alphanumeric characters", function(done) {
            var sendData = {
                email: "email@email.com",
                password: "bad1234567**"
            };
            routeTester.postRequest(routeTester.usersEndpoint + "/register", sendData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failurePOSTResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureBadPasswordFormatMessage, res.body.data.message);
                done();
            });
        })
    });

    describe("POST /authenticate", function() {
        it("should return a fail message if no email provided", function(done) {
            var testData = {
                email: null,
                password: "password"
            };
            routeTester.postRequest(routeTester.usersEndpoint + "/authenticate", testData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failurePOSTResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureNoEmailProvidedMessage, res.body.data.message);
                done();
            });
        });

        it("should return a fail message if no password provided", function(done) {
            var testData = {
                email: "email@email.com",
                password: null
            };
            routeTester.postRequest(routeTester.usersEndpoint + "/authenticate", testData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failurePOSTResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureNoPasswordProvidedMessage, res.body.data.message);
                done();
            });
        });
        it("should return a fail message if user is not in database", function(done) {
            var testData = {
                email: "bad@email",
                password: "password"
            };
            routeTester.postRequest(routeTester.usersEndpoint + "/authenticate", testData).end(function(err, res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failurePOSTResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureNoUserByIdentifierMessage, res.body.data.message);
                done();
            });
        });
        it("should return a fail message if passwords do not match", function(done) {
            var testUser = new User({
                email: "tester@emailtester.com",
                password: "password"
            });
            testUser.save(function(err) {
                if(!err) {
                    routeTester.postRequest(routeTester.usersEndpoint + "/authenticate", {email: "tester@emailtester.com", password: "wrongpass"}).end(function(err, res) {
                        routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                        routeTester.assert.equal(routeTester.failurePOSTResponseStatusCode, res.body.statusCode);
                        routeTester.assert.equal(routeTester.failureInvalidPasswordMessage, res.body.data.message);
                        done();
                    });
                }
            });

        });
        it("should return a token if password do match", function(done) {
            var testUser = new User({
                email: "tester445@emailtester.com",
                password: passwordHasher.generate("password")
            });
            testUser.save(function(err) {
                if(!err) {
                    routeTester.postRequest(routeTester.usersEndpoint + "/authenticate", {email: "tester445@emailtester.com", password: "password"}).end(function(err, res) {
                        routeTester.assert.equal(routeTester.successfulResponseStatus, res.body.status);
                        routeTester.assert.equal(routeTester.successfulGETResponseStatusCode, res.body.statusCode);
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
            routeTester.getRequest(routeTester.usersEndpoint + "/deauthenticate").end(function(err,res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureUnauthorizedResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureNoTokenProvidedMessage, res.body.data.message);
                done();
            });
        });
        it("should successfully accept requests", function(done) {
            var payload = {};
            var options = {
                expiresIn: "2h",
                issuer: "test"
            };
            var token = jwt.sign(payload,tokenSecret,options);
            routeTester.getRequest(routeTester.usersEndpoint + "/deauthenticate" + "?token=" + token).end(function(err,res) {
                routeTester.assert.equal(routeTester.successfulResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.successfulGETResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.successfulDEAuthenticationMessage, res.body.data.message);
                done();
            });
        });
        it("should create a new RevokedToken instance in db", function(done) {
            var payload = {};
            var options = {
                expiresIn: "2h",
                issuer: "test"
            };
            var token = jwt.sign(payload,tokenSecret,options);
            routeTester.getRequest(routeTester.usersEndpoint + "/deauthenticate" + "?token=" + token).end(function(err) {
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
            var badToken = "thisIsABadToken";
            routeTester.getRequest(routeTester.usersEndpoint + "/deauthenticate" + "?token=" + badToken).end(function(err,res) {
                routeTester.assert.equal(routeTester.failureResponseStatus, res.body.status);
                routeTester.assert.equal(routeTester.failureUnauthorizedResponseStatusCode, res.body.statusCode);
                routeTester.assert.equal(routeTester.failureInvalidTokenMessage, res.body.data.message);
                done();
            });
        });
    })
});