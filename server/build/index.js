"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ticketsMethods_1 = require("./ticketsMethods");
var userLists_1 = require("./userLists");
var utils_1 = require("./utils");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var body_parser_2 = require("body-parser");
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.listen(3000, function () {
    console.log("Server running on port 3000");
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_2.json());
app.use(cors_1.default());
app.post("/users/signin", function (req, res) {
    var user = req.body.username;
    var pwd = req.body.password;
    // return 400 status if username/password is not exist
    if (!user || !pwd) {
        return utils_1.handleResponse(req, res, 400, {}, "Username and Password required.");
    }
    var userData = userLists_1.userList.find(function (x) { return x.username === user && x.password === pwd; });
    // return 401 status if the credential is not matched
    if (!userData) {
        return utils_1.handleResponse(req, res, 401, {}, "Username or Password is Wrong.");
    }
    // get basic user details
    var userObj = utils_1.getCleanUser(userData);
    // generate access token
    var tokenObj = utils_1.generateToken(userData);
    // generate refresh token
    var refreshToken = utils_1.generateRefreshToken(userObj === null || userObj === void 0 ? void 0 : userObj.userId) || 0;
    // refresh token list to manage the xsrf token
    if (refreshToken != null)
        utils_1.refreshTokens[refreshToken] = tokenObj === null || tokenObj === void 0 ? void 0 : tokenObj.xsrfToken;
    // set cookies
    //res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    res.cookie("XSRF-TOKEN", tokenObj === null || tokenObj === void 0 ? void 0 : tokenObj.xsrfToken);
    return utils_1.handleResponse(req, res, 200, {
        user: userObj,
        token: tokenObj === null || tokenObj === void 0 ? void 0 : tokenObj.token,
        expiredAt: tokenObj === null || tokenObj === void 0 ? void 0 : tokenObj.expiredAt,
    }, "");
});
app.post("/users/logout", function (req, res) {
    utils_1.clearTokens(req, res);
    return utils_1.handleResponse(req, res, 204, {}, "");
});
var ticketsLists = [];
app.get("/notfication", function (req, res, next) {
    var result = ticketsMethods_1.checkAnyNotValidated(ticketsLists);
    res.send(result);
});
app.get("/validate/:ticketId", function (req, res, next) {
    var relevantTicketindex = ticketsLists.findIndex(function (ticketToFind) { return ticketToFind.id == req.query.ticketId; });
    var isValidated = ticketsMethods_1.validateTicket(ticketsLists[relevantTicketindex]);
    ticketsLists[relevantTicketindex].isValidated = isValidated;
    res.send(isValidated);
});
app.post("/purchase", function (req, res) {
    console.log("body is ", req.body);
    var newTicket = ticketsMethods_1.generateTicket();
    ticketsLists.push(newTicket);
    res.send(newTicket.id);
});
