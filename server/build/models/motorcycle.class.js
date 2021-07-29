"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.motorcycle = void 0;
var motorcycleType_enum_1 = require("./motorcycleType.enum");
var sample = require("lodash.sample");
var motorcycle = /** @class */ (function () {
    function motorcycle() {
        this.number = Math.random() * (6000 - 1000) + 1000;
        this.color = "red";
        this.year = Math.random() * (2020 - 2010) + 2010;
        this.type = sample(Object.values(motorcycleType_enum_1.motorcycleType));
    }
    return motorcycle;
}());
exports.motorcycle = motorcycle;
