var router = require("express").Router();
var User = require("resources/users/model");
var jwt = require("jsonwebtoken");
var multer = require("multer")();
var httpResponses = require("constants/httpResponses");
var validator = require("validator");
var passwordHasher = require("password-hash");
var RevokedToken = require("resources/revokedTokens/model");
var httpResponder = require("shared/httpResponder");
var endpoints = require("constants/endpoints");
var tokenSecret = require("private/appSecrets").tokenSecret;
var tokenOptions = require("constants/tokenOptions");
var serverStatics = require("constants/serverStatics");

router.post(endpoints.registerEndpoint, multer.array(), function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    if(!email || !password) {
        return res.json(
            httpResponder.respondToBadRequest(httpResponses.failureMissingEmailOrPasswordMessage)
        );
    }
    if(!validator.isEmail(email)) {
        return res.json(
            httpResponder.respondToBadRequest(httpResponses.failureBadEmailFormatMessage)
        );
    }
    if(!validator.isLength(password, 7) || !validator.isAlphanumeric(password)) {
        return res.json(
            httpResponder.respondToBadRequest(httpResponses.failureBadPasswordFormatMessage)
        );
    }
    var newUser = User({
        email: email,
        password: passwordHasher.generate(password)
    });
    newUser.save(function(err) {
        if(err) return res.send(err);
        return res.json(
            httpResponder.respondToCREATEDRequest(httpResponses.successfulRegisterMessage)
        );
    });
});

router.post(endpoints.authenticateEndpoint, multer.array(), function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if(!email) {
        return res.json(
            httpResponder.respondToBadRequest(httpResponses.failureNoEmailProvidedMessage)
        );
    }
    if(!password) {
        return res.json(
            httpResponder.respondToBadRequest(httpResponses.failureNoPasswordProvidedMessage)
        );
    }
    User.findOne({email: email}, function(err, user) {
        if(user == null) {
            return res.json(
                httpResponder.respondToBadRequest(httpResponses.failureNoUserWithEmailMessage)
            );
        }
        if(!passwordHasher.verify(password, user.password)) {
            return res.json(
                httpResponder.respondToBadRequest(httpResponses.failurePasswordNotVerifiedMessage)
            );
        }
        else {
            var payload = {
                userId: user.id
            };
            var token = jwt.sign(payload, tokenSecret, tokenOptions);

            return res.json(
                httpResponder.respondToOKRequest(httpResponses.successfulAuthenticationMessage, {token: token})
            );
        }
    });
});

router.use(endpoints.DEauthenticateEndpoint, function(req, res) {
    var token = req.body.token || req.query.token || req.headers[serverStatics.headerAccessTokenKey];
    if(!token) {
        return res.json(
            httpResponder.respondToUnauthorizedRequest(httpResponses.failureNoTokenProvidedMessage)
        );
    }
    jwt.verify(token, tokenSecret, function(err, decoded) {
        if(!decoded) {
            return res.json(
                httpResponder.respondToUnauthorizedRequest(httpResponses.failureInvalidTokenMessage)
            );
        }
        else{
            var newRevokedToken = new RevokedToken({
                token: token
            });

            newRevokedToken.save(function(err) {
                if(!err) {
                    return res.json(
                        httpResponder.respondToOKRequest(httpResponses.successfulDEAuthenticationMessage)
                    );
                }
            });
        }
    });

});

module.exports = router;