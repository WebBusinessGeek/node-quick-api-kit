var router = require("express").Router();
var httpResponses = require("constants/httpResponses");
var tokenSecret = require("private/appSecrets").tokenSecret;
var jwt = require("jsonwebtoken");
var RevokedToken = require("resources/revokedTokens/model");
var httpResponder = require("shared/httpResponder");
var serverStatics = require("constants/serverStatics");

router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers[serverStatics.headerAccessTokenKey];
    if(!token){
        return res.json(
            httpResponder.respondToUnauthorizedRequest(httpResponses.failureNoTokenProvidedMessage)
        );
    }
    RevokedToken.findOne({token: token}, function(err, revokedToken) {
        if(revokedToken) {
            return res.json(
                httpResponder.respondToUnauthorizedRequest(httpResponses.failureInvalidTokenMessage)
            );
        }
        jwt.verify(token, tokenSecret, function(err, decoded) {
            if(!decoded) {
                return res.json(
                    httpResponder.respondToUnauthorizedRequest(httpResponses.failureInvalidTokenMessage)
                );
            }
            req.decoded = decoded;
            next();
        });
    });
});

module.exports = router;