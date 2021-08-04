"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticket = void 0;
var uuid_1 = require("uuid");
var ticket = /** @class */ (function () {
    function ticket() {
        this.id = uuid_1.v4();
        this.purchaseDate = new Date();
        this.isValidated = false;
    }
    return ticket;
}());
exports.ticket = ticket;
//# sourceMappingURL=ticket.class.js.map