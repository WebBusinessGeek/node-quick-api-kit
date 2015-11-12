var gulp = require("gulp");
var shell = require("gulp-shell");

gulp.task("setup", shell.task([
    "node_modules/.bin/epr",
    "touch app/private/databaseSecrets.js app/private/appSecrets.js",
    "echo exports.databaseUri = '\"mongoose db uri goes here\";' > app/private/databaseSecrets.js",
    "echo exports.tokenSecret = '\"secret for jwt goes here\";' > app/private/appSecrets.js",
    "echo Project has been setup. Add private secrets and then run '\"npm test\"'"
]));