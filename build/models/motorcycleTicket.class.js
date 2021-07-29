"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.motorcycleTicket = void 0;
var motorcycle_class_1 = require("./motorcycle.class");
var ticket_class_1 = require("./ticket.class");
var motorcycleTicket = /** @class */ (function (_super) {
    __extends(motorcycleTicket, _super);
    function motorcycleTicket() {
        var _this = _super.call(this) || this;
        _this.price = new motorcycle_class_1.motorcycle();
        return _this;
    }
    return motorcycleTicket;
}(ticket_class_1.ticket));
exports.motorcycleTicket = motorcycleTicket;
