var mongoose = require("mongoose");
var Schema = mongoose.Schema;

RevokedTokenSchema = new Schema({
    token: String
});

module.exports = mongoose.model("RevokedToken", RevokedTokenSchema);