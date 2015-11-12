var gulp = require("gulp");
var shell = require("gulp-shell");

gulp.task("setup", shell.task([
    "npm install",
    "node_modules/.bin/epr",
    "touch app/private/databaseSecrets.js app/private/appSecrets.js",
    "echo exports.databaseUri = 'uri goes here' > app/private/databaseSecrets.js",
    "echo exports.tokenSecret = 'token secret goes here' > app/private/appSecrets.js",
    "echo project setup"
]));