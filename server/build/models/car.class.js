"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.car = void 0;
var carTypes_enum_1 = require("./carTypes.enum");
var sample = require('lodash.sample');
var car = /** @class */ (function () {
    function car() {
        this.number = Math.random() * (6000 - 1000) + 1000;
        this.color = "blue";
        this.year = Math.random() * (2020 - 2010) + 2010;
        this.type = sample(Object.values(carTypes_enum_1.carTypes));
    }
    return car;
}());
exports.car = car;
