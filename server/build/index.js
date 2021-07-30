"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ticketsMethods_1 = require("./ticketsMethods");
var _a = require('./utils'), refreshTokens = _a.refreshTokens, COOKIE_OPTIONS = _a.COOKIE_OPTIONS, generateToken = _a.generateToken, generateRefreshToken = _a.generateRefreshToken, getCleanUser = _a.getCleanUser, verifyToken = _a.verifyToken, clearTokens = _a.clearTokens, handleResponse = _a.handleResponse;
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
app.use(cors_1.default({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.post("/users/logout", function (req, res) {
    clearTokens(req, res);
    return handleResponse(req, res, 204);
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
