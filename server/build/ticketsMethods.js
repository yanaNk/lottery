"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAnyNotValidated = exports.generateTicket = exports.validateTicket = void 0;
var motorcycleTicket_class_1 = require("./models/motorcycleTicket.class");
var carTicket_class_1 = require("./models/carTicket.class");
var cashTicket_class_1 = require("./models/cashTicket.class");
var lostTicket_class_1 = require("./models/lostTicket.class");
var sample = require("lodash.sample");
var factoryClasses = {
    "lostTicket": lostTicket_class_1.lostTicket,
    "carTicket": carTicket_class_1.carTicket,
    "motorcycleTicket": motorcycleTicket_class_1.motorcycleTicket,
    "cashTicket": cashTicket_class_1.cashTicket
};
function validateTicket(ticket) {
    return !(ticket instanceof lostTicket_class_1.lostTicket);
}
exports.validateTicket = validateTicket;
function generateTicket() {
    var newType = sample(Object.keys(factoryClasses));
    console.log(factoryClasses);
    var newTicket = factoryClasses[newType]();
    return newTicket;
}
exports.generateTicket = generateTicket;
function checkAnyNotValidated(tickets) {
    return tickets.some(function (ticketToCheck) { return ticketToCheck.isValidated == false; });
}
exports.checkAnyNotValidated = checkAnyNotValidated;
//# sourceMappingURL=ticketsMethods.js.map