var router = require("express").Router();
var httpResponses = require("constants/httpResponses");
var tokenSecret = require("private/appSecrets").tokenSecret;
var jwt = require("jsonwebtoken");
var RevokedToken = require("resources/revokedTokens/model");

router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token){
        return res.json({
            status: httpResponses.failureResponseStatus,
            statusCode: httpResponses.failureUnauthorizedStatusCode,
            data: {
                message: httpResponses.failureNoTokenProvidedMessage
            }
        });
    }
    RevokedToken.findOne({token: token}, function(err, revokedToken) {
        if(revokedToken) {
            return res.json({
                status: httpResponses.failureResponseStatus,
                statusCode: httpResponses.failureUnauthorizedStatusCode,
                data: {
                    message: httpResponses.failureInvalidTokenMessage
                }
            });
        }
        jwt.verify(token, tokenSecret, function(err, decoded) {
            if(!decoded) {
                return res.json({
                    status: httpResponses.failureResponseStatus,
                    statusCode: httpResponses.failureUnauthorizedStatusCode,
                    data: {
                        message: httpResponses.failureInvalidTokenMessage
                    }
                })
            }
            req.decoded = decoded;
            next();
        });
    });
});

module.exports = router;