exports.successfulResponseStatus = "success";
exports.failureResponseStatus = "fail";


/*STATUS CODES*/

/*Success status codes*/
exports.successOKStatusCode = 200;
exports.successCREATEDStatusCode = 201;

/*Failure status codes*/
exports.failureBadRequestStatusCode = 400;
exports.failureUnauthorizedStatusCode = 401;


/*MESSAGES*/

/*Success Messages*/
exports.successfulRegisterMessage = "New user created/saved successfully";
exports.successfulAuthenticationMessage = "User successfully authenticated";
exports.successfulDEAuthenticationMessage = "User successfully de-authenticated";

/*Failure Messages*/
exports.failureMissingEmailOrPasswordMessage = "Missing email or password";
exports.failureBadEmailFormatMessage = "Bad format for email";
exports.failureBadPasswordFormatMessage = "Bad format for password";
exports.failureNoEmailProvidedMessage = "No email provided";
exports.failureNoPasswordProvidedMessage = "No password provided";
exports.failureNoUserWithEmailMessage = "No user by that email";
exports.failurePasswordNotVerifiedMessage = "Password does not match our records";
exports.failureNoTokenProvidedMessage = "No token provided";
exports.failureInvalidTokenMessage = "Invalid token";

/*Test Route Messages*/
exports.successfulTestRoutePOSTResponseMessage = "Successful POST request to test route";
exports.successfulTestRouteGETResponseMessage = "Successful GET request to test route";
exports.successfulTestRoutePUTResponseMessage = "Successful PUT request to test route";
exports.successfulTestRouteDELETEResponseMessage = "Successful DELETE request to test route";
exports.successfulTestRouteAuthNeededResponseMessage = "Successful call to protected test route";
