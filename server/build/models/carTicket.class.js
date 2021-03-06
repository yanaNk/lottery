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
exports.carTicket = void 0;
var car_class_1 = require("./car.class");
var ticket_class_1 = require("./ticket.class");
var carTicket = /** @class */ (function (_super) {
    __extends(carTicket, _super);
    function carTicket() {
        var _this = _super.call(this) || this;
        _this.name = "car";
        _this.price = new car_class_1.car();
        return _this;
    }
    return carTicket;
}(ticket_class_1.ticket));
exports.carTicket = carTicket;
//# sourceMappingURL=carTicket.class.js.map