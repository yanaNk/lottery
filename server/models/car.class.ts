import { carTypes } from './carTypes.enum';
var sample = require('lodash.sample');
export class car {
  number: number;
  color: string;
  year: number;
  type:carTypes;
  constructor() {
    this.number = Math.random() * (6000 - 1000) + 1000;
    this.color = "blue";
    this.year = Math.random() * (2020 - 2010) + 2010;
    this.type = sample(Object.values(carTypes));
  }
}
