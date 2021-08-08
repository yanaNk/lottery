"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ticketsMethods_1 = require("./ticketsMethods");
var utils_1 = require("./utils");
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var body_parser_2 = require("body-parser");
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = require("socket.io");
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var app = express_1.default();
var count = 0;
var clientPort = 3001;
var serverUrl = "http://localhost:" + clientPort;
var secret = "ABCDEF$123";
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(body_parser_2.json());
app.use(cors_1.default({ origin: serverUrl }));
app.use(function (req, res, next) {
    var token = req.headers['authorization'];
    if (!token)
        return next();
    token = token.replace('Bearer ', '');
    jsonwebtoken_1.verify(token, secret, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        }
        else {
            req.user = user; //set the user to req so other routes can use it
            next();
        }
    });
});
var server = app.listen(3000, function () { return console.log("Listening Socket on 3000"); });
var io = new socket_io_1.Server(server, { cors: { origin: '*' } });
io.on('connection', function (socket) {
    if (interval) {
        clearInterval(interval);
        count = 0;
    }
    interval = setInterval(function () { return sendNotfication(socket); }, 120000);
    socket.on("disconnect", function () {
        clearInterval(interval);
    });
});
var ticketsLists = [];
var interval;
var sendNotfication = function (socket) {
    if (ticketsLists.length > 0) {
        if (ticketsLists.some(function (ticket) { return ticket.isValidated == false; })) {
            count++;
            socket.emit("fromServer", count);
        }
    }
    return;
};
app.post("/users/signin", function (req, res) {
    var user = req.body.username;
    var pwd = req.body.password;
    if (!user || !pwd) {
        return res.status(400).json({
            error: true,
            message: "Username or Password is required."
        });
    }
    var relevantUser = utils_1.getRelevantUser(user, pwd);
    if (relevantUser == false) {
        return res.status(401).json({
            error: true,
            message: "Username or Password is wrong."
        });
    }
    var token = utils_1.generateToken(relevantUser);
    var userObj = utils_1.getCleanUser(relevantUser);
    return res.json({ user: userObj, token: token });
});
app.get('/verifyToken', function (req, res) {
    var token = req.query.token;
    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }
    // check token that was passed by decoding token using secret
    jsonwebtoken_1.verify(token.toString(), secret, function (err, user) {
        if (err)
            return res.status(401).json({
                error: true,
                message: "Invalid token."
            });
        if (!utils_1.checkUserExists(user)) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        }
        var relevantUser = utils_1.getRelevantAfterLogIn(user);
        var userObj = utils_1.getCleanUser(relevantUser);
        return res.json({ user: userObj, token: token });
    });
});
app.get("/allTickets", function (req, res) {
    res.send(ticketsLists);
});
app.get("/notfication", function (req, res, next) {
    var result = ticketsMethods_1.checkAnyNotValidated(ticketsLists);
    res.send(result);
});
app.get("/validate", function (req, res, next) {
    var relevantTicketindex = ticketsLists.findIndex(function (ticketToFind) { return ticketToFind.id == req.query.ticketId; });
    if (relevantTicketindex == -1)
        res.send(false);
    else {
        if (ticketsLists[relevantTicketindex].isValidated)
            res.send("already validated");
        ticketsMethods_1.validateTicket(ticketsLists[relevantTicketindex]);
        res.send(ticketsLists[relevantTicketindex]);
    }
});
app.post("/purchase", function (req, res) {
    var newTicket = ticketsMethods_1.generateTicket();
    ticketsLists.push(newTicket);
    res.send(newTicket.id);
});
app.get("/getTicket", function (req, res, next) {
    var relevantTicket = ticketsLists.find(function (ticketToFind) { return ticketToFind.id == req.query.ticketId; });
    res.send(relevantTicket);
});
//# sourceMappingURL=index.js.map