import { motorcycleType } from "./motorcycleType.enum";
var sample = require("lodash.sample");
export class motorcycle {
  number: number;
  color: string;
  year: number;
  type: motorcycleType;

  constructor() {
    this.number = Math.random() * (6000 - 1000) + 1000;
    this.color = "red";
    this.year = Math.random() * (2020 - 2010) + 2010;
    this.type = sample(Object.values(motorcycleType));
  }
}
