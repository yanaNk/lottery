"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAnyNotValidated = exports.generateTicket = exports.validateTicket = void 0;
var lostTicket_class_1 = require("./models/lostTicket.class");
function validateTicket(ticket) {
    return ticket instanceof lostTicket_class_1.lostTicket;
}
exports.validateTicket = validateTicket;
function generateTicket() {
    var newTicket = new lostTicket_class_1.lostTicket();
    return newTicket;
}
exports.generateTicket = generateTicket;
function checkAnyNotValidated(tickets) {
    return tickets.some(function (ticketToCheck) { return ticketToCheck.isValidated == false; });
}
exports.checkAnyNotValidated = checkAnyNotValidated;
