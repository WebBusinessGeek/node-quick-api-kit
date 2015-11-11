var User = require("resources/users/model");
var jwt = require("jsonwebtoken");
var router = require("express").Router();
var multer = require("multer")();
var httpResponses = require("constants/httpResponses");
var tokenSecret = require("private/appSecrets").tokenSecret;
var validator = require("validator");
var passwordHasher = require("password-hash");
var RevokedToken = require("resources/revokedTokens/model");
var httpResponder = require("shared/httpResponder");

router.post("/register", multer.array(), function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    if(!email || !password) {
        return res.json(
            httpResponder.respond(
                httpResponses.failureResponseStatus,
                httpResponses.failurePOSTResponseStatusCode,
                httpResponses.failureRegisterMessage));
    }
    if(!validator.isEmail(email)) {
        return res.json({
            status: httpResponses.failureResponseStatus,
            statusCode: httpResponses.failurePOSTResponseStatusCode,
            data: {
                message: httpResponses.failureBadEmailFormatMessage
            }
        })
    }
    if(!validator.isLength(password, 7) || !validator.isAlphanumeric(password)) {
        return res.json({
            status: httpResponses.failureResponseStatus,
            statusCode: httpResponses.failurePOSTResponseStatusCode,
            data: {
                message: httpResponses.failureBadPasswordFormatMessage
            }
        });
    }
    var newUser = User({
        email: email,
        password: passwordHasher.generate(password)
    });
    newUser.save(function(err) {
        if(err) return res.send(err);
        return res.json({
            status: httpResponses.successfulResponseStatus,
            statusCode: httpResponses.successfulPOSTResponseStatusCode,
            data: {
                message: httpResponses.successfulRegisterMessage
            }
        });
    });
});

router.post("/authenticate", multer.array(), function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if(!email) {
        return res.json({
            status: httpResponses.failureResponseStatus,
            statusCode: httpResponses.failurePOSTResponseStatusCode,
            data: {
                message: httpResponses.failureNoEmailProvidedMessage
            }
        });
    }
    if(!password) {
        return res.json({
            status: httpResponses.failureResponseStatus,
            statusCode: httpResponses.failurePOSTResponseStatusCode,
            data: {
                message: httpResponses.failureNoPasswordProvidedMessage
            }
        });
    }
    User.findOne({email: email}, function(err, user) {
        if(user == null) {
            return res.json({
                status: httpResponses.failureResponseStatus,
                statusCode: httpResponses.failurePOSTResponseStatusCode,
                data: {
                    message: httpResponses.failureNoUserByIdentifierMessage
                }
            });
        }
        if(!passwordHasher.verify(password, user.password)) {
            return res.json({
                status: httpResponses.failureResponseStatus,
                statusCode: httpResponses.failurePOSTResponseStatusCode,
                data: {
                    message: httpResponses.failureInvalidPasswordMessage
                }
            });
        }
        else {
            var payload = {
                userId: user.id
            };
            var options = {
                expiresIn: "2h",
                issuer: "api"
            };
            var token = jwt.sign(payload, tokenSecret, options);

            return res.json({
                status: httpResponses.successfulResponseStatus,
                statusCode: httpResponses.successfulGETResponseStatusCode,
                data: {
                    message: httpResponses.successfulAuthenticationMessage,
                    token: token
                }
            })
        }
    });
});

router.use("/deauthenticate", function(req, res) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token) {
        return res.json({
            status: httpResponses.failureResponseStatus,
            statusCode: httpResponses.failureUnauthorizedResponseStatusCode,
            data: {
                message: httpResponses.failureNoTokenProvidedMessage
            }
        });
    }
    jwt.verify(token, tokenSecret, function(err, decoded) {
        if(!decoded) {
            return res.json({
                status: httpResponses.failureResponseStatus,
                statusCode: httpResponses.failureUnauthorizedResponseStatusCode,
                data: {
                    message: httpResponses.failureInvalidTokenMessage
                }
            });
        }
        else{
            var newRevokedToken = new RevokedToken({
                token: token
            });

            newRevokedToken.save(function(err) {
                if(!err) {
                    return res.json({
                        status: httpResponses.successfulResponseStatus,
                        statusCode: httpResponses.successfulGETResponseStatusCode,
                        data: {
                            message: httpResponses.successfulDEAuthenticationMessage
                        }
                    });
                }
            });
        }
    });

});


module.exports = router;