"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var moment_1 = __importDefault(require("moment"));
var rand_token_1 = require("rand-token");
var ms_1 = __importDefault(require("ms"));
var dev = process.env.NODE_ENV !== 'production';
// refresh token list to manage the xsrf token
var refreshTokens = {};
// cookie options to create refresh token
var COOKIE_OPTIONS = {
    // domain: "localhost",
    httpOnly: true,
    secure: !dev,
    signed: true
};
// generate tokens and return it
function generateToken(user) {
    if (!user)
        return null;
    var u = {
        userId: user.userId,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    };
    // generat xsrf token and use it to generate access token
    var xsrfToken = rand_token_1.generate(24);
    // create private key by combining JWT secret and xsrf token
    var privateKey = process.env.JWT_SECRET + xsrfToken;
    // generate access token and expiry date
    var token = jsonwebtoken_1.sign(u, privateKey, { expiresIn: process.env.ACCESS_TOKEN_LIFE });
    // expiry time of the access token
    var expiredAt = moment_1.default().add(ms_1.default(5), 'ms').valueOf();
    return {
        token: token,
        expiredAt: expiredAt,
        xsrfToken: xsrfToken
    };
}
// generate refresh token
function generateRefreshToken(userId) {
    if (!userId)
        return null;
    return jsonwebtoken_1.sign({ userId: userId }, "jj", { expiresIn: process.env.REFRESH_TOKEN_LIFE });
}
// verify access token and refresh token
function verifyToken(token, xsrfToken, cb) {
    if (xsrfToken === void 0) { xsrfToken = ''; }
    var privateKey = process.env.JWT_SECRET + xsrfToken;
    jsonwebtoken_1.verify(token, privateKey, cb);
}
// return basic user details
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
// handle the API response
function handleResponse(req, res, statusCode, data, message) {
    var isError = false;
    var errorMessage = message;
    switch (statusCode) {
        case 204:
            return res.sendStatus(204);
        case 400:
            isError = true;
            break;
        case 401:
            isError = true;
            errorMessage = message || 'Invalid user.';
            clearTokens(req, res);
            break;
        case 403:
            isError = true;
            errorMessage = message || 'Access to this resource is denied.';
            clearTokens(req, res);
            break;
        default:
            break;
    }
    var resObj = data;
    if (isError && resObj) {
        resObj.error = true;
        resObj.message = errorMessage;
    }
    return res.status(statusCode).json(resObj);
}
// clear tokens from cookie
function clearTokens(req, res) {
    var _a = req.signedCookies, signedCookies = _a === void 0 ? {} : _a;
    var refreshToken = signedCookies.refreshToken;
    //delete refreshTokens[refreshToken];
    res.clearCookie('XSRF-TOKEN');
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
}
exports.default = {
    refreshTokens: refreshTokens,
    COOKIE_OPTIONS: COOKIE_OPTIONS,
    generateToken: generateToken,
    generateRefreshToken: generateRefreshToken,
    verifyToken: verifyToken,
    getCleanUser: getCleanUser,
    handleResponse: handleResponse,
    clearTokens: clearTokens
};
