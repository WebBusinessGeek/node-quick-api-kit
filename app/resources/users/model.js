var mongoose = require("mongoose");
var Schema = mongoose.Schema;

UserSchema = new Schema({
    email: String,
    password: String
});


module.exports = mongoose.model("User", UserSchema);

