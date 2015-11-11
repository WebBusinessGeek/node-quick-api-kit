var User = require("resources/users/model");
var assert = require("chai").assert;

describe("User Model", function() {
    it("should have an email property", function() {
        var testUser = new User();
        assert.property(testUser, "email");
    });
    it("should have a password property", function() {
        var testUser = new User();
        assert.property(testUser, "password");
    });
    it("should have an id property", function() {
        var testUser = new User();
        assert.property(testUser, "id");
    });

});