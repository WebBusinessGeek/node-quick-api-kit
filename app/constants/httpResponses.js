exports.successfulResponseStatus = "success";
exports.failureResponseStatus = "fail";



exports.successfulGETResponseStatusCode = 200;
exports.successfulPOSTResponseStatusCode = 201;
exports.successfulPUTResponseStatusCode = 204;
exports.successfulDELETEResponseStatusCode = 204;


exports.failurePOSTResponseStatusCode = 400;
exports.failureUnauthorizedResponseStatusCode = 401;


exports.successfulTestRoutePOSTResponseMessage = "Successful POST request to test route";
exports.successfulTestRouteGETResponseMessage = "Successful GET request to test route";
exports.successfulTestRoutePUTResponseMessage = "Successful PUT request to test route";
exports.successfulTestRouteDELETEResponseMessage = "Successful DELETE request to test route";
exports.successfulTestRouteAuthNeededResponseMessage = "Successful call to protected test route";

exports.successfulRegisterMessage = "New user created/saved successfully";
exports.successfulAuthenticationMessage = "User successfully authenticated";
exports.successfulDEAuthenticationMessage = "User successfully de-authenticated";



exports.failureRegisterMessage = "Missing email or password";
exports.failureBadEmailFormatMessage = "Bad format for email";
exports.failureBadPasswordFormatMessage = "Invalid password";
exports.failureNoEmailProvidedMessage = "No email provided";
exports.failureNoPasswordProvidedMessage = "No password provided";
exports.failureNoUserByIdentifierMessage = "No user by that identifier";
exports.failureInvalidPasswordMessage = "Password is invalid";
exports.failureNoTokenProvidedMessage = "No token provided";
exports.failureInvalidTokenMessage = "Invalid token";