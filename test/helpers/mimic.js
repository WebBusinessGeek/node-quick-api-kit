exports.generateRandomIntegers = function() {
    return Math.floor((Math.random() * 100000) + 100);
};
exports.badJWTToken = "2342jklsdkjfs3i423i0jsfdkfljss:slkj2342k3l4kj:slkdjfsl3023";
exports.invalidEmail = "bad@bad";
exports.invalidPasswordShort = "bad";
exports.invalidPasswordBadChars = "bad#$#lskdfj$*skjd";

exports.mimicUniqueValidEmail = function() {
    return this.generateRandomIntegers() + this.generateRandomIntegers() + "email.com";
};
exports.mimicValidEmail = function() {
    return this.generateRandomIntegers() + "@email.com";
};
exports.mimicValidPassword = function() {
    return this.generateRandomIntegers() + "password";
};


exports.randomString = "random string";
exports.generateRandomString = function() {
    return "random string" + this.generateRandomIntegers();
};

