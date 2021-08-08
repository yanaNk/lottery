"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelevantAfterLogIn = exports.checkUserExists = exports.getRelevantUser = exports.getCleanUser = exports.generateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var userLists_1 = require("./userLists");
require('dotenv').config();
var secret = "ABCDEF$123";
;
function generateToken(user) {
    if (!user)
        return null;
    var u = {
        userId: user.userId,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    };
    return jsonwebtoken_1.sign(u, secret, {
        expiresIn: 60 * 60 * 24
    });
}
exports.generateToken = generateToken;
function getCleanUser(user) {
    if (!user)
        return null;
    return {
        userId: user.userId,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    };
}
exports.getCleanUser = getCleanUser;
function getRelevantUser(userName, password) {
    var userIndex = userLists_1.userList.findIndex(function (user) { return user.username == userName && user.password == password; });
    if (userIndex == -1) {
        return false;
    }
    return userLists_1.userList[userIndex];
}
exports.getRelevantUser = getRelevantUser;
function checkUserExists(userToCheck) {
    return userLists_1.userList.findIndex(function (user) { return user.userId == userToCheck.userId; }) != -1;
}
exports.checkUserExists = checkUserExists;
function getRelevantAfterLogIn(userName) {
    var userIndex = userLists_1.userList.findIndex(function (user) { return user.userId == userName.userId; });
    if (userIndex == -1) {
        return false;
    }
    return userLists_1.userList[userIndex];
}
exports.getRelevantAfterLogIn = getRelevantAfterLogIn;
exports.default = {
    generateToken: generateToken,
    getCleanUser: getCleanUser,
};
//# sourceMappingURL=utils.js.map